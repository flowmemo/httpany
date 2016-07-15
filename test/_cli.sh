npm link
httpany test/fixtures -p 3001 & pid_0=$!
nyc ava test
kill $pid_0