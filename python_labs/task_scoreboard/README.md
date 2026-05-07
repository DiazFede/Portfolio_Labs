# Task Scoreboard

`Task Scoreboard` is a compact Python CLI for tracking short task lists from the terminal.

It supports:

- adding tasks
- marking tasks as done
- listing pending or all tasks
- showing a quick completion summary

## Run

```sh
python task_scoreboard.py add "Finish portfolio README"
python task_scoreboard.py list
python task_scoreboard.py done 1
python task_scoreboard.py stats
```

## Notes

- Data is stored in `tasks.json` in the same folder by default.
- You can point to a custom file with `--store`.

Example:

```sh
python task_scoreboard.py --store demo.json add "Ship the mini project"
```
