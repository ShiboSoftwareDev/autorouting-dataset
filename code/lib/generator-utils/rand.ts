import MersenneTwister from "mersenne-twister"

const hashCode = function (s: string) {
  let hash = 0,
    i,
    chr
  if (s.length === 0) return hash
  for (i = 0; i < s.length; i++) {
    chr = s.charCodeAt(i)
    hash = (hash << 5) - hash + chr
    hash |= 0 // Convert to 32bit integer
  }
  return hash
}

const generator = new MersenneTwister(1)

/**
 * Generates a random number between 0 and 1 using the provided seeds.
 */
export const rand = (...seeds: (string | number)[]) => {
  generator.init_by_array(
    seeds.map((seed) =>
      typeof seed === "string" ? hashCode(seed.toString()) : seed
    ),
    seeds.length
  )

  return generator.random()
}
