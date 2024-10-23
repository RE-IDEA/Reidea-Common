import React, { Dispatch, PropsWithChildren, ReactElement, ReactNode, SetStateAction, useCallback, useEffect, useState } from 'react'
import Autoplay from 'embla-carousel-autoplay'
import AutoScroll from 'embla-carousel-auto-scroll'
import useEmblaCarousel from 'embla-carousel-react'
import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'
import "./css/EmblaCarousel.css"
// import "./css/BannerCarousel.css"
import { BannerCarouselDotButton, useDotButton } from './buttons/BannerCarouselDotButton'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import { Box } from '@mui/material'
import { BaseButton } from '../Button/base/BaseButton'

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean
  nextBtnDisabled: boolean
  onPrevButtonClick: () => void
  onNextButtonClick: () => void
}

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined,
  onButtonClick?: (emblaApi: EmblaCarouselType) => void
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollPrev()
    if (onButtonClick) onButtonClick(emblaApi)
  }, [emblaApi, onButtonClick])

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
    if (onButtonClick) onButtonClick(emblaApi)
  }, [emblaApi, onButtonClick])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect)
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  }
}


interface Props {
  isBanner?: boolean;
  delay?: number;
  displayButton?: boolean;
  items?: any[];
  slide_min_width?: number;
  borderRadius?: number;
  aspectRatio?: string;
  playOnInit?: boolean;
  autoScroll?: boolean;
  IDs?: (string|null)[];
  isSelectedBorder?: boolean;
  setSelectedID?: Dispatch<SetStateAction<string|null>>;
  loop?: boolean;
  otherTransparent?: boolean;

  prevButton?: ReactElement;
  nextButton?: ReactElement;
  selectedDotButtonStyle?: React.CSSProperties;

  disableDrag?: boolean;
  disableScroll?: boolean; 
}


export const FlexCarousel: React.FC<Props> = ({ isBanner, displayButton, playOnInit, items, slide_min_width, delay, IDs, setSelectedID, loop, otherTransparent, autoScroll, prevButton, nextButton, disableDrag, selectedDotButtonStyle, disableScroll }) => {
  const options: EmblaOptionsType = { loop: loop ?? true, skipSnaps: true, axis: 'x', dragFree: false}
  const [isPlaying, setIsPlaying] = useState(false)
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ 
      playOnInit: playOnInit === undefined ? false : playOnInit, 
      delay: delay ? delay : 3000
    }),
    AutoScroll({ 
      playOnInit: autoScroll === undefined ? false : autoScroll, 
      startDelay: 30,
      speed: 1.0,
    }),
    WheelGesturesPlugin({
    }),
  ])
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)
  const [wheelSelectedIndex, setWheelSelectedIndex] = useState(0)
  const [wheelScrollSnaps, setWheelScrollSnaps] = useState<number[]>([])

  useEffect(() => {
    if(!disableDrag){
      const autoplay: any = emblaApi?.plugins()?.autoplay
      const wheelScroll = emblaApi?.plugins()?.wheelGestures
      if (!autoplay || !wheelScroll) return
  
      setIsPlaying(autoplay.isPlaying())
      emblaApi
        .on('autoplay:play', () => setIsPlaying(playOnInit === undefined ? false : playOnInit))
        .on('autoplay:stop', () => setIsPlaying(false))
        .on('reInit', () => setIsPlaying(autoplay.isPlaying()))
  
      const onSelect = () => {
        setWheelSelectedIndex(emblaApi.selectedScrollSnap())
        setPrevBtnEnabled(emblaApi.canScrollPrev())
        setNextBtnEnabled(emblaApi.canScrollNext())
      }
  
      setWheelScrollSnaps(emblaApi.scrollSnapList())
      emblaApi.on('select', onSelect)
      onSelect()
    }
  }, [emblaApi])

  useEffect(() => {
    if(setSelectedID && IDs) setSelectedID(IDs[selectedIndex])
  }, [selectedIndex])


  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi)

  const onButtonAutoplayClick = useCallback(
    (callback: () => void) => {
      const autoScroll = emblaApi?.plugins()?.autoScroll
      const wheelScroll = emblaApi?.plugins()?.wheelGestures
      if (!autoScroll || !wheelScroll) return;
      const resetOrStop : any =
        (autoScroll.options as any).stopOnInteraction === false
          ? autoScroll.reset
          : autoScroll.stop
      resetOrStop()
      callback()
    },
    [emblaApi]
  )

  const ModifiedPrevButton = () => {
    if (React.isValidElement(prevButton)) {
      return React.cloneElement(prevButton as React.ReactElement<{ onClick?: ()=>void }>, {
        onClick: ()=> {onButtonAutoplayClick(onPrevButtonClick)},
      });
    }
    return null;
  };

  const ModifiedNextButton = () => {
    if (React.isValidElement(nextButton)) {
      return React.cloneElement(nextButton as React.ReactElement<{ onClick?: ()=>void }>, {
        onClick: ()=> {onButtonAutoplayClick(onNextButtonClick)},
      });
    }
    return null;
  };


  


  return (
    <div className={isBanner ? "banner" : "embla"} style={{ position:"relative", '--slide-size': isBanner ? "100%" : `${slide_min_width ?? 0}px` } as React.CSSProperties}>
      <div className={isBanner ? "banner__viewport" : "embla__viewport"} ref={emblaRef}>
        <div className={isBanner ? "banner__container" : "embla__container"} >
          {(items ?? []).map((item:any, index) => (
            <div className={isBanner ? "banner__slide" : "embla__slide"} key={index} style={{ opacity: otherTransparent ? (index !== selectedIndex ? 0.2 : 1) : undefined, transition: 'opacity 0.2s ease-in-out' }} >
              <div className={isBanner ? "banner__slide__number" : "embla__slide__number"}>
                {item}
              </div>
            </div>
          ))}
        </div>
      </div>

      {displayButton !== false &&
        <div className="banner__controls">
          <div className="banner__dots">
            {scrollSnaps.map((_, index) => {
              return(
                <BannerCarouselDotButton
                  key={index}
                  onClick={() => onDotButtonClick(index)}
                  className={'banner__dot'}
                  style={{
                    backgroundColor: index === selectedIndex ? '#383E86' : '#C2C2C2', // 選択された場合のスタイル  
                    ...(index === selectedIndex  ? selectedDotButtonStyle : {})
                  }}
                />
              )
            })}
          </div>
        </div>
      }

      {ModifiedPrevButton()}
      {ModifiedNextButton()}

    </div>
  )
}