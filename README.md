# Electron Image Shrinker

A cross-platform electron app to shrink images

## Development

Using electron to run the app with `electron .` at the root project folder.

Use `npn run dev` to run nodemon so main process changes will restart the app

## Log

By default, it writes logs to the following locations:

on Linux: ~/.config/{app name}/logs/{process type}.log

on macOS: ~/Library/Logs/{app name}/{process type}.log

on Windows: %USERPROFILE%\AppData\Roaming\{app name}\logs\{process type}.log
