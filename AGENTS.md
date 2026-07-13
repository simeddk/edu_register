# Project working instructions

## Development server

- When the user says `실행 환경을 만들어줘`, `실행해보자`, or `테스트해보자`, start the Vite development server for this project on the local network.
- Use this command from the project root:

  ```powershell
  npx.cmd vite --host 0.0.0.0 --port 5174 --strictPort
  ```

- In Codex background processes, `npx.cmd` may not be on `PATH`. In that case, prepend `C:\Program Files\nodejs` to `PATH` and run `C:\Program Files\nodejs\npx.cmd` with the same arguments.

- Run it as a hidden background process so the task can continue while the server remains available.
- After starting it, verify that port 5174 is listening and report both:
  - PC address: `http://localhost:5174`
  - Mobile address: the machine's active private IPv4 address with port 5174
- If port 5174 is already occupied, first determine whether this project's Vite server is already running. Reuse it when appropriate; do not silently choose another port because `--strictPort` is intentional.
- When the user asks to stop or close the execution environment, stop only the development-server process started for this project.
