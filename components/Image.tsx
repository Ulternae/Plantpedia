import { useCallback } from 'react'
import NextImage, {
  ImageLoaderProps,
  ImageProps as NextImageProps,
} from 'next/image'

type ImageProps = {
  width: number
  height?: never
  layout: ImageLayout
  aspectRatio: AspectRatio
  fit?: ContentfulFit
  f?: ContentfulFocus
  quality?: number
} & DistributiveOmit<NextImageProps, 'height'>

export function Image({
  width,
  fit = 'fill',
  aspectRatio,
  f,
  quality,
  ...nextImageProps
}: ImageProps) {
  const height = calcAspectRatioHeight(aspectRatio, width)

  const imageLoader = useCallback(
    (loaderArgs: ImageLoaderProps) => {
      const h = calcAspectRatioHeight(aspectRatio, loaderArgs.width)
      const finalQuality = quality || loaderArgs.quality

      return `${loaderArgs.src}?w=${loaderArgs.width}&h=${h}&fit=${fit}${f ? `&f=${f}` : ''}${finalQuality ? `&q=${finalQuality}` : ''}`
    },
    [aspectRatio, fit, f, quality]
  )

  return (
    <NextImage
      {...nextImageProps}
      width={width}
      height={height}
      loader={imageLoader}
    />
  )
}

export type ContentfulFit = 'pad' | 'fill' | 'scale' | 'crop' | 'thumb'

export type ContentfulFocus =
  | 'center'
  | 'face'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'

export type AspectRatio = '1:1' | '4:3' | '16:9'

export type ImageLayout = 'fill' | 'fixed' | 'intrinsic' | 'responsive'

type DistributiveOmit<T, K extends keyof T> = T extends unknown
  ? Omit<T, K>
  : never

const calcAspectRatioHeight = (aspectRatio: AspectRatio, width: number) => {
  const aspectRatioParts = aspectRatio.split(':')
  const [w, h] = aspectRatioParts
  const height = (parseInt(h) * width) / parseInt(w)
  return height
}