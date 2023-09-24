export const getYoutubeId = (url: string) => {
  return url.split('embed/')[1]
}
