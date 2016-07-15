httpany test/fixtures -p 3001 & pid_0=$!
nyc ava
kill $pid_0