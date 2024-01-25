import { useEffect, useState } from 'react'

function preloadImage (src) {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = function() {
            resolve(img)
        }
        img.onerror = img.onabort = function() {
            reject(src)
        }
        img.src = src
    })
}

export function useImagePreloader(imageList) {
    const [imagesPreloaded, setImagesPreloaded] = useState(false)
    // console.log(imageList, "imageList")
    useEffect(() => {
        let isCancelled = false
        console.log("2222")
        async function effect() {
            console.log('PRELOAD')

            if (isCancelled) {
                return
            }

            const imagesPromiseList = []
            for (const i of imageList) {
                imagesPromiseList.push(preloadImage(i))
            }

            await Promise.all(imagesPromiseList)

            if (isCancelled) {
                return
            }

            setImagesPreloaded(true)
        }
        console.log("start")
        effect()
        console.log("end")
        return () => {
            isCancelled = true
        }
    }, [imageList])

    return { imagesPreloaded }
}