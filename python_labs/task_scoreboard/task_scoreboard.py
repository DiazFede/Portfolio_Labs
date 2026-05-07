from __future__ import annotations

import argparse
import json
from dataclasses import dataclass, asdict
from pathlib import Path
from typing import Iterable


DEFAULT_STORE = Path(__file__).with_name("tasks.json")


@dataclass
class Task:
    id: int
    title: str
    done: bool = False


def load_tasks(store: Path) -> list[Task]:
    if not store.exists():
        return []

    data = json.loads(store.read_text(encoding="utf-8"))
    return [Task(**item) for item in data]


def save_tasks(store: Path, tasks: Iterable[Task]) -> None:
    payload = [asdict(task) for task in tasks]
    store.write_text(json.dumps(payload, indent=2), encoding="utf-8")


def next_task_id(tasks: list[Task]) -> int:
    if not tasks:
        return 1
    return max(task.id for task in tasks) + 1


def add_task(store: Path, title: str) -> Task:
    clean_title = title.strip()
    if not clean_title:
        raise ValueError("Task title cannot be empty.")

    tasks = load_tasks(store)
    task = Task(id=next_task_id(tasks), title=clean_title)
    tasks.append(task)
    save_tasks(store, tasks)
    return task


def complete_task(store: Path, task_id: int) -> Task:
    tasks = load_tasks(store)

    for task in tasks:
        if task.id == task_id:
            task.done = True
            save_tasks(store, tasks)
            return task

    raise ValueError(f"Task {task_id} was not found.")


def list_tasks(store: Path, show_all: bool) -> list[Task]:
    tasks = load_tasks(store)
    if show_all:
        return tasks
    return [task for task in tasks if not task.done]


def build_stats(tasks: list[Task]) -> dict[str, int]:
    total = len(tasks)
    completed = sum(task.done for task in tasks)
    pending = total - completed
    return {"total": total, "completed": completed, "pending": pending}


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Track short task lists from the terminal.",
    )
    parser.add_argument(
        "--store",
        type=Path,
        default=DEFAULT_STORE,
        help="Path to the JSON storage file.",
    )

    subparsers = parser.add_subparsers(dest="command", required=True)

    add_parser = subparsers.add_parser("add", help="Create a new task.")
    add_parser.add_argument("title", help="Task title.")

    done_parser = subparsers.add_parser("done", help="Mark a task as completed.")
    done_parser.add_argument("task_id", type=int, help="Task id.")

    list_parser = subparsers.add_parser("list", help="List tasks.")
    list_parser.add_argument(
        "--all",
        action="store_true",
        help="Include completed tasks in the output.",
    )

    subparsers.add_parser("stats", help="Show completion stats.")

    return parser


def format_task(task: Task) -> str:
    status = "x" if task.done else " "
    return f"[{status}] {task.id}: {task.title}"


def run_cli(argv: list[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    store = args.store

    try:
        if args.command == "add":
            task = add_task(store, args.title)
            print(f"Created task {task.id}: {task.title}")
            return 0

        if args.command == "done":
            task = complete_task(store, args.task_id)
            print(f"Completed task {task.id}: {task.title}")
            return 0

        if args.command == "list":
            tasks = list_tasks(store, args.all)
            if not tasks:
                print("No tasks to show.")
                return 0

            for task in tasks:
                print(format_task(task))
            return 0

        if args.command == "stats":
            stats = build_stats(load_tasks(store))
            print(
                f"Total: {stats['total']} | Completed: {stats['completed']} | Pending: {stats['pending']}"
            )
            return 0

    except ValueError as exc:
        print(exc)
        return 1

    parser.print_help()
    return 1


if __name__ == "__main__":
    raise SystemExit(run_cli())
