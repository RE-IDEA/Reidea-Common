
// src/App.tsx
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';  // ReactDOM from 'react-dom' ではなく 'react-dom/client'

import { BaseButton, BaseTextField, MailTextField, PhoneTextField, FlexCarousel, BaseGrid, SwipableStack, SlideInOut, SlideComponent } from './index';
import { Box, Stack } from '@mui/material';
import { UserIcon } from './Icon/UserIcon';
import { FlexDrawer } from './Drawer/FlexDrawer';
import { PasswordTextField } from './TextField/PasswordTextField';
import {YahooLoginButton} from './Button/SNSButton/YahooLoginButton';
import {GoogleLoginButton} from './Button/SNSButton/GoogleLoginButton';
import {XLoginButton} from './Button/SNSButton/XLoginButton';
import { BaseMessage } from './Chat/base/BaseMessage';
import LetterByLetter from './Animation/LetterByLetter';
import { ObserverStack } from './Animation/ObserverStack';
import {BaseSelector} from './Selector/base/BaseSelector';
import { LoadingImage } from './Image/LoadingImage';
import {BasePopup} from './Popup/BasePopup';
import { BaseTable } from './Table/BaseTable';
import { BaseDragObjTextField } from './TextField/base/BaseDragObjTextField';
import { BaseSnackBar } from './Snackbar/BaseSnackBar';
import { BaseAccordion } from './Accordion/BaseAccordion';
import URLDetectTextfield from './TextField/URLDetectTextfield';
import { BasePopover } from './Popover/BasePopover';


// Button
export {BaseButton as BaseButton} from "./Button/base/BaseButton"

// Popup
export {BasePopup as BasePopup} from "./Popup/BasePopup"

// Popover
export {BasePopover as BasePopover} from "./Popover/BasePopover"

// LoadingImage
export {LoadingImage as LoadingImage} from "./Image/LoadingImage"

// UserIcon
export {UserIcon as UserIcon} from "./Icon/UserIcon"
export {GoogleLoginButton as GoogleLoginButton} from "./Button/SNSButton/GoogleLoginButton"
export {YahooLoginButton as YahooLoginButton} from "./Button/SNSButton/YahooLoginButton"
export {XLoginButton as XLoginButton} from "./Button/SNSButton/XLoginButton"

// FlexDrawer
export {FlexDrawer as FlexDrawer} from "./Drawer/FlexDrawer"

// TextField
export {BaseTextField as BaseTextField} from "./TextField/base/BaseTextField"
export {MailTextField as MailTextField} from "./TextField/MailTextField"
export {PhoneTextField as PhoneTextField} from "./TextField/PhoneTextField"
export {PasswordTextField as PasswordTextField} from "./TextField/PasswordTextField"

// Chat
export {BaseMessage as BaseMessage} from "./Chat/base/BaseMessage"

// Selector
export {BaseSelector as BaseSelector} from "./Selector/base/BaseSelector"

// Carousel Layout
export {FlexCarousel as FlexCarousel} from "./Carousel/FlexCarousel"

// Grid Layout
export {BaseGrid as BaseGrid} from "./Grid/base/BaseGrid"

// Grid Layout
export {BaseTable as BaseTable} from "./Table/BaseTable"

// Swipable Layout
export {SwipableStack as SwipableStack} from "./SwipableComponent/SwipableStack"

// SlideInOut Layout
export {SlideComponent as SlideComponent} from "./Animation/SlideComponent"
export {SlideInOut as SlideInOut} from "./Animation/SlideInOut";

// Animation
export {LetterByLetter as LetterByLetter} from "./Animation/LetterByLetter"
export {ObserverStack as ObserverStack} from "./Animation/ObserverStack";
export {BaseSnackBar as BaseSnackBar} from "./Snackbar/BaseSnackBar";
export {BaseAccordion as BaseAccordion} from "./Accordion/BaseAccordion"


const App = () => {
  const [value, setValue] = React.useState<string>('');
  const [direction, setDirection] = React.useState<string>('');
  const [sort_value, setSortValue] = React.useState<string>('');
  const [anchorEL, setAnchorEL] = React.useState<HTMLElement | null>(null);
  const [error, setError] = React.useState<boolean>(false);
  const [mode, setMode] = React.useState<string>("1");
  const [openDrawer, setOpenDrawer] = React.useState<boolean>(false);
  const [openPopup, setOpenPopup] = React.useState<boolean>(false);
  const object = <Box width={400} height={100} bgcolor={"grey"}/> 
  const [gridCols, setGridCols] = useState<number>(window.innerWidth < 1000 ? 3 : 4);
  const [rowViewed, setRowViewed] = React.useState<boolean>(false);

  const [animation, setAnimation] = React.useState<boolean>(false);
  
  useEffect(() => {
    const handleResize = () => {
      setGridCols(window.innerWidth < 1000 ? 3 : 4);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const [gridItems, setGridItems] = useState<React.ReactElement[]>([object,object,]);
  useEffect(() => {
    if (rowViewed === true) {
      setTimeout(() => {
        setGridItems([object, object, ...gridItems, ]);
        setRowViewed(false);
      }, 1000); // 1000ms = 1秒
    }
  }, [rowViewed]);

  return (
    <Stack spacing={2} mb={40} style={{ padding: '10px 40px' }}>
      <h1>Component Viewer</h1>
      <Stack direction={"row"} spacing={2}>
        <Stack>
            <h3>AutoAdjustButton</h3>
            <BaseButton autoAdjustFontSize height='30px' width='100px' />
        </Stack>
        <Stack>
            <h3>LoadingImage</h3>
            <LoadingImage loading width={300} height={100} 
                borderRadius={10}
            />
        </Stack>
        <Stack>
            <h3>BasePopup</h3>
            <BaseButton onClick={()=>{setOpenPopup(true)}} text='animation' autoAdjustFontSize height='30px' width='100px' />
            <BasePopup
                open={openPopup} handleClose={()=>{setOpenPopup(false)}}
            >
                <Box height={"100%"} width={"100%"} bgcolor={"black"}></Box>
            </BasePopup>
        </Stack>

        <Stack>
            <h3>BasePopover</h3>
            <BasePopover
              parent={<BaseButton text='open' height='30px'/>}
              children={<Box height={"100px"} width={"100px"} bgcolor={"black"}/>}
            />
        </Stack>

        <Stack>
            <h3>BaseURLDetectTextfield</h3>
            <URLDetectTextfield />
        </Stack>

      </Stack>
      
      {/* テキストフィールド */}
      <Stack direction={"row"} spacing={2} justifyContent={"space-between"}>
        <Stack width={"100%"}>
            <h3>BaseTextField</h3>
            <BaseTextField value={value} setValue={setValue} placeholder="Enter text"
              endAdormentComponent={<Box height={10} width={20} bgcolor={'black'}></Box>}
            />
        </Stack>
        <Stack width={"100%"}>
            <h3>MailTextField</h3>
            <MailTextField width='100%' value={value} setValue={setValue} error={false} setError={undefined} errorText='エラー' placeholder="Enter email" />
        </Stack>
        <Stack width={"100%"}>
            <h3>PhoneTextField</h3>
            <PhoneTextField width='100%' value={value} setValue={setValue} error={false} setError={undefined} errorText='エラー' placeholder="Enter phone number" />
        </Stack>
        <Stack width={"100%"}>
            <h3>PasswordTextField</h3>
            <PasswordTextField width='100%' value={value} setValue={setValue} error={error} setError={setError} errorText='エラー' placeholder="Enter valid password" />
        </Stack>
      </Stack>

      <Stack direction={"row"} spacing={6}>
        <Stack>
            <h3>UserIcon</h3>
            <UserIcon size={50} image_uri={"https://lh3.googleusercontent.com/a/ACg8ocJWmDnoRVfyMaj9gf5pc5WU5pC8zkTcAgDcqOmBaur67n9fVRA=s96-c"}
                        user_name='hello' onClick={()=>{console.log("UserIcon clicked!!")}} />
        </Stack>

        <Stack>
            <h3>BaseSelctor</h3>
            <BaseSelector value={sort_value} setValue={setSortValue} values={["1", "0", "2"]} labels={["aaaaaaaaaaaa", "b", "c"]} 
                width={"100%"} padding='0px 5px'
            />
        </Stack>

        <Stack>
            <h3>YahooLoginIcon</h3>
            <YahooLoginButton padding={0} width={200} height={40} onClick={()=>{}}/>
        </Stack>

        <Stack>
            <h3>GoogleLoginIcon</h3>
            <GoogleLoginButton width={200} height={40} onClick={()=>{}}/>
        </Stack>

        <Stack>
            <h3>XLoginIcon</h3>
            <XLoginButton width={200} height={40} onClick={()=>{}}/>
        </Stack>
      
        <Stack >
            <h3>FlexDrawer</h3>
            <BaseButton width='60px' height='30px' text='open' onClick={()=>{setOpenDrawer(true)}}/>
            <FlexDrawer width='30%' open={openDrawer} setOpen={setOpenDrawer} >
                <Stack width={"100%"} height={"100%"} bgcolor={"lightgrey"}></Stack>
            </FlexDrawer>
        </Stack>
      </Stack>

      <h3>FlexCarousel</h3>
      <FlexCarousel disableDrag selectedDotButtonStyle={{backgroundImage: "-webkit-linear-gradient(left, #43CEA2 0%, #185A9D 100%)"}}
        displayButton={true} isBanner={false} slide_min_width={440} autoScroll={false}
        items={[object, object, object, object, object, object]} 
      />

      <h3>BaseGrid</h3>
      <BaseButton width='10%' text='animation' onClick={()=>{setAnimation(!animation)}}/>
      <BaseGrid 
        cols={1}
        items={gridItems}
        rowViewed={rowViewed}
        setRowViewed={setRowViewed}
        firstRowObserve={false}
        addDirection='top'
        enableAnimation={true}
        animation={animation}
        animationDelay={0.2}
        animationDuration={0.8}
        animationOffsetY={40}
        animationInitialDisplay={true}
        animationDirection={"bottom-up"}
        height={100}
      />

      <h3>Chat-Message</h3>
      <BaseMessage 
        left={false} viewed={true}
        // display_user={true}
        fontSize={14}
        message={"メッセージメッセージメッセージメッセージメッセージメッセージメッセージメッセージ"}
        createdAtString='17:19' 
        user_name='ユーザーネーム'
        message_max_width={300}
      />

      <h3>BaseTable</h3>
      <BaseTable 
        enableAnimation
        tableCSS={{maxHeight:200}}
        head={
            {
                rowCSS: {width:100},
                values:[{value: <>hello</>, align:"center"}, {value: <>hi</>}]
            }
        }
        bodies={[
            {values:[{value: <>hello</>}, {value: <>hi</>}], rowCSS:{backgroundColor:"lightgrey"}},
            {values:[{value: <>hello</>}, {value: <>hi</>}]},
        ]}
      />

      <h3>SwipableComponent</h3>
      <h5>direction: {direction}</h5>
      <SwipableStack 
        onSwipedLeft={()=>{setDirection("left");}}
        onSwipedRight={()=>{setDirection("right")}}
      >
        <Box width={300} height={200} bgcolor={"lightgrey"}/>
      </SwipableStack>

      <h3>Animation</h3>
      <Stack direction={"row"} spacing={4}>
        <h5>mode: {mode}</h5> 
        <h5>direction: {direction}</h5>
      </Stack>
      <BaseButton width='10%' text='animation' onClick={()=>{setMode(mode === "1" ? "2" : "1")}}/>
      <Stack direction={"row"} spacing={1}>
        <BaseButton width='10%' text='left' onClick={()=>{setDirection("left")}}/>
        <BaseButton width='10%' text='right' onClick={()=>{setDirection("right")}}/>
      </Stack>
      <SlideInOut>
        {mode === "1" &&
            <SlideComponent display={mode === "1"} key='1' 
                initial={direction === "right" ? "left" : 'right'} 
                animate='center' duration={0.15}
                exit={"exit"} >
                <Box width={300} height={200} bgcolor={"lightgrey"}/>
            </SlideComponent>
        }
        {mode === "2" &&
            <SlideComponent display={mode === "2"} key='2' 
                initial={direction === "right" ? "left" : 'right'} 
                animate='center' duration={0.15}
                exit={"exit"} >
                <Box width={300} height={200} bgcolor={"grey"}/>
            </SlideComponent>
        }
      </SlideInOut>

      <Stack direction={"row"} width={"100%"} spacing={3} >
        <Stack>
          <h4>letter-by-letter</h4> 
          <BaseButton width='100px' height='50px' text={"animation"} onClick={()=>{setAnimation(!animation)}}/>
          <LetterByLetter text={'anim\nated'} isAnimated={animation} delay={100} offsetY={10} startDelay={1000}
            style={{ fontWeight: 'bold', fontSize:"28px", letterSpacing:0.5, color:"#383E86" }} />
        </Stack>

        <Stack>
          <h4>Observer Stack</h4> 
          <ObserverStack setObserved={setAnimation} bgcolor={"snow"} p={2} >
            <h4>検出中: {animation ? "画面内" : "画面外"}</h4> 
          </ObserverStack>
        </Stack>

        <Stack>
          <h4>BaseSnackBar</h4>
          <BaseSnackBar 
            open={animation}
            handleClose={()=>{setAnimation(false)}}
            message='テキスト'
            style={{fontSize: 12, color:"red", backgroundColor: "white", fontWeight: "bold"}}
          />
        </Stack>

        <Stack>
          <h4>BaseAccordion</h4>
          <BaseAccordion 
            summary={<Stack width={"100px"}>hello</Stack>}
            preview={<Stack width={"100px"} bgcolor={"lightgrey"} >preview</Stack>}
            details={<Stack width={"100px"} bgcolor={"grey"} >details</Stack>}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
