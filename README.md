# md5-crypto

`md5` hashing function that utilizes node `crypto` module instead of implementing the algorithm like other available
npm modules.

## Why?

- native solutions are (almost) always faster
- less code to include and parse at startup = faster startup

### Benchmark:

I've written (and included with source code) simple benchmark that compares performance of this module to most popular
npm md5-hashing module, called `md5`, here are the results:

```
`md5` module takes 491 ms to run 100000 times on short string
`md5-crypto` module takes 163 ms to run 100000 times (328 ms and 3.01 times better) on short string

`md5` module takes 796 ms to run 100 times on long string (100k bytes)
`md5-crypto` module takes 29 ms to run 100 times (767 ms and 27.45 times better) on long string (100k bytes)

`md5` module takes 1157 ms to run 100 times on long string (100k bytes, random-same-character string each time)
`md5-crypto` module takes 408 ms to run 100 times (749 ms and 2.84 times better) on long string (100k bytes, random-same-character string each time)
```

If you belive these examples are misleading please submit a PR with more advanced examples.

## Why not?

- it won't work in browser (for universal/isomorphic rendering you can still conditionally include this on server and
  something else in browser)

## License

MIT
