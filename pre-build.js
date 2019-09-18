const https = require('https')
const path = require('path')
const fs = require('fs')
const request = require('request')
const zlib = require('zlib')
const AdmZip = require('adm-zip');

const prefix = 'https://github.com/Dreamacro/clash/releases/download'
const version = 'v0.15.0'
const binary_name = 'clash'

async function downloadClashBinary() {
    let platform = ''
    let arch = ''
    let ext = ''
    let url = ''
    let fileName = ''
    switch(process.platform) {
        case 'darwin':
            platform = 'darwin'
            arch='amd64'
            ext = '.gz'
            break
        case 'win32':
            platform = 'windows'
            if (process.arch === 'x64') {
                arch = 'amd64'
                ext = '.zip'
            } else {
                arch = '386'
                ext = '.zip'
            }
            break
        case 'linux':
            platform = 'linux'
            if (process.arch === 'x64') {
                arch = 'amd64'
                ext = '.gz'
            } else {
                arch = '386'
                ext = '.gz'
            }
            break
        default:
            break
    }
    url = `${prefix}/${version}/${binary_name}-${platform}-${arch}-${version}${ext}`
    fileName = `clash-${platform}-${arch}${platform === 'windows' ? '.exe' : ''}`
    const filePath = path.join('.', 'clash-binaries', fileName + ext)
    if (fs.existsSync(filePath)) {
        console.log(`Clash binary exists for Platform: ${platform}, Arch: ${arch}`)
        return Promise.resolve(filePath)
    }
    const fos = fs.createWriteStream(filePath)
    return new Promise((resolve, reject) => {
        console.log(`Prepare to download Clash binary for Platform ${platform}, Arch: ${arch}`)
        const stream = request.get(url)
            .pipe(fos)
        
        stream.on('finish', () => {
            resolve(filePath)
        })
        .on('error', () => {
            reject()
        })
    })
}

function unZipGzFile(filePath) {
    return new Promise((resolve, reject) => {
        console.log(filePath)
        const fileContents = fs.createReadStream(filePath);
        const writeStream = fs.createWriteStream(filePath.slice(0, -3));
        const unzip = zlib.createGunzip();
        fileContents.pipe(unzip).pipe(writeStream).on('finish', err => {
            if (err) {
                reject(err)
                return
            }
            fs.unlinkSync(filePath)
            resolve()
        })
    })
}

function unZipZipFile(filePath) {
    return new Promise((resolve, reject) => {
        const zip = new AdmZip(filePath)
        zip.extractAllToAsync(path.join('.', 'clash-binaries'), true, err => {
            if (err) {
                reject(err)
                return
            }
            fs.unlinkSync(filePath)
            resolve()
        })
    })
}

downloadClashBinary().then((filePath) => {
    console.log('Clash binary downloaded.')
    console.log('Extracting...')
    if (process.platform === 'win32') {
        return unZipZipFile(filePath)
    } else {
        return unZipGzFile(filePath)
    }
}).then(() => {
    console.log('Done.')
}).catch(e => {
    console.error(e)
})
