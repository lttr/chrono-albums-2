import * as ExifReader from "exifreader"
import { parse } from "date-fns"
import type { GpsTags } from "~~/shared/types/media"

export interface MyExifData {
  dateTaken: Date | undefined
  gps: GpsTags | undefined
}

export async function parseExifData(file: File): Promise<MyExifData> {
  const tags = await ExifReader.load(file, { expanded: true })

  const dateTimeOriginal = tags.exif?.DateTimeOriginal?.description
  let dateTaken = undefined
  if (dateTimeOriginal) {
    dateTaken = parse(dateTimeOriginal, "yyyy:MM:dd HH:mm:ss", new Date())
  }

  const gps = tags.gps

  return {
    dateTaken,
    gps,
  }
}
