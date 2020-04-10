const sharp = require('sharp')
const fs = require('fs')

// taken from https://stackoverflow.com/a/44338759/5698865
function* cartesian(head, ...tail) {
    let remainder = tail.length ? cartesian(...tail) : [[]];
    for (let r of remainder) for (let h of head) yield [h, ...r];
}

const qualities = [100, 98, 95, 90, 80, 60]
const widths = [1500, 1000, 800]
const input_images = fs.readdirSync('./input')

for (let [image, quality, width] of cartesian(input_images, qualities, widths)) {
    console.log(image, quality, width)
    const image_name = image.replace(/\..*/, '')
    fs.copyFileSync(`./input/${image}`, `./output/${image_name}_original.jpg`)

    sharp(`./input/${image}`).jpeg({quality: quality})
        .resize(width)
        .toFile(`./output/${image_name}_${width}_${quality}.jpg`)
}
