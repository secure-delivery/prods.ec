export function Video({
  src
}: {
  src: string
}) {
  return (

    <iframe
      className="w-full aspect-video"
      src={src}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen>
    </iframe>

  )
}
