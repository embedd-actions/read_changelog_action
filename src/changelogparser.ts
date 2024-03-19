import * as fs from 'fs'

export function ParseChangelog(filename: string, tag: string): string {
  let result = ''
  const words = fs.readFileSync(filename, 'utf-8')

  let LastFoundTag = ''

  const arr = words.split(/\r?\n/)

  // Read file line by line
  for (let line of arr) {
    let regex = /[0-9]+.[0-9]+.[0-9]+[-]?[bB]?[0-9]?[0-9]?[0-9]?[0-9]?[0-9]?/g
    let probe = regex.exec(line)

    if (probe) {
      LastFoundTag = probe[0]
    } else {
      regex = /[*-/#][\s]?[\w\s]+[;.]?/g
      probe = regex.exec(line)

      if (probe) {
        line = line.replace('\n', '')
        line = line.replace('\r', '')

        if (LastFoundTag.search(tag) !== -1) {
          result += `${line}\r\n`
        }
      }
    }
  }
  return result
}
