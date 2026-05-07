import sys
from pathlib import Path
from tempfile import TemporaryDirectory
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from task_scoreboard import (
    add_task,
    build_stats,
    complete_task,
    list_tasks,
    load_tasks,
)


class TaskScoreboardTests(unittest.TestCase):
    def setUp(self) -> None:
        self.temp_dir = TemporaryDirectory()
        self.addCleanup(self.temp_dir.cleanup)
        self.store = Path(self.temp_dir.name) / "tasks.json"

    def test_add_task_persists_data(self) -> None:
        task = add_task(self.store, "Write tests")

        self.assertEqual(task.id, 1)
        self.assertEqual(load_tasks(self.store)[0].title, "Write tests")

    def test_complete_task_updates_status(self) -> None:
        task = add_task(self.store, "Finish CLI")

        complete_task(self.store, task.id)

        self.assertTrue(load_tasks(self.store)[0].done)

    def test_list_tasks_hides_completed_by_default(self) -> None:
        first = add_task(self.store, "Pending task")
        second = add_task(self.store, "Completed task")
        complete_task(self.store, second.id)

        visible = list_tasks(self.store, show_all=False)

        self.assertEqual([task.id for task in visible], [first.id])

    def test_stats_count_pending_and_completed_tasks(self) -> None:
        first = add_task(self.store, "Task one")
        add_task(self.store, "Task two")
        complete_task(self.store, first.id)

        stats = build_stats(load_tasks(self.store))

        self.assertEqual(stats, {"total": 2, "completed": 1, "pending": 1})


if __name__ == "__main__":
    unittest.main()
