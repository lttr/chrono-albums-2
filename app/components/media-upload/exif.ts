import * as ExifReader from "exifreader"

export async function parseExifData(file: File) {
  const tags = await ExifReader.load(file, { expanded: true })
  console.log(file.name)
  console.log(tags.file?.["Image Width"])
  console.log(tags.file?.["Image Height"])
  const dateTaken = tags.exif?.DateTimeOriginal
  console.log("dateTaken", dateTaken)

  const gps = tags.gps
  console.log("gps", gps)
}
