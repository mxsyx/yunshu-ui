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
    const pkgSrcDir = `${pkgDir}/src`
    const componentName = camelize(pkgName)

    if (fs.existsSync(pkgDir)) {
      throw new Error(`package ${pkgName} already exists.`)
    }

    fs.mkdirSync(pkgDir)
    fs.writeFileSync(`${pkgDir}/index.ts`, `export * from "./src"`)
    fs.writeFileSync(`${pkgDir}/README.md`, `# ${componentName}`)

    fs.mkdirSync(pkgSrcDir)
    fs.writeFileSync(`${pkgSrcDir}/${componentName}.ts`, '')
    fs.writeFileSync(`${pkgSrcDir}/index.ts`, `export * from "./${componentName}"`)

    r.close()
    process.exit(0)
  })
}

createPkg()
