// Create a new component.

const readline = require("readline")
const fs = require("fs")
const path = require("path")

const r = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function camelize(str) {
  return `-${str}`.replace(/-\D/g, match => {
    return match.charAt(1).toUpperCase()
  })
}

function createPkg() {
  r.question('please input package name: ', pkgName => {
    const pkgDir = path.resolve(__dirname, '../packages', pkgName)

    if (fs.existsSync(pkgDir)) {
      console.error(`package ${pkgName} already exists.`);
      return
    }

    fs.mkdirSync(pkgDir)
    fs.writeFileSync(`${pkgDir}/index.ts`, `export * from "./src"`)
    fs.writeFileSync(`${pkgDir}/README.md`, `# ${pkgName}`)

    const pkgSrcDir = `${pkgDir}/src`
    fs.mkdirSync(pkgSrcDir)
    fs.writeFileSync(`${pkgSrcDir}/${camelize(pkgName)}.ts`, '')
    fs.writeFileSync(`${pkgSrcDir}/index.ts`, `export * from "./${pkgName}"`)

    r.close()
    process.exit(0)
  })
}

createPkg()
