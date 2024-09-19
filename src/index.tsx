
// src/App.tsx
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';  // ReactDOM from 'react-dom' ではなく 'react-dom/client'

import { BaseButton, BaseTextField, MailTextField, PhoneTextField, FlexCarousel, BaseGrid, SwipableStack, SlideInOut, SlideComponent } from './index';
import { Box, Stack } from '@mui/material';
import { UserIcon } from './Icon/UserIcon';
import { FlexDrawer } from './Drawer/FlexDrawer';


// Button
export {BaseButton as BaseButton} from "./Button/base/BaseButton"

// UserIcon
export {UserIcon as UserIcon} from "./Icon/UserIcon"

// FlexDrawer
export {FlexDrawer as FlexDrawer} from "./Drawer/FlexDrawer"

// TextField
export {BaseTextField as BaseTextField} from "./TextField/base/BaseTextField"
export {MailTextField as MailTextField} from "./TextField/MailTextField"
export {PhoneTextField as PhoneTextField} from "./TextField/PhoneTextField"

// Carousel Layout
export {FlexCarousel as FlexCarousel} from "./Carousel/FlexCarousel"

// Grid Layout
export {BaseGrid as BaseGrid} from "./Grid/base/BaseGrid"

// Swipable Layout
export {SwipableStack as SwipableStack} from "./SwipableComponent/SwipableStack"

// SlideInOut Layout
export {SlideComponent as SlideComponent} from "./Animation/SlideComponent"
export {SlideInOut as SlideInOut} from "./Animation/SlideInOut";


// const App = () => {
//   const [value, setValue] = React.useState<string>('');
//   const [direction, setDirection] = React.useState<string>('');
//   const [error, setError] = React.useState<boolean>(false);
//   const [mode, setMode] = React.useState<string>("1");
//   const [openDrawer, setOpenDrawer] = React.useState<boolean>(false);
//   const object = <Box width={400} height={100} bgcolor={"grey"}/> 
//   const [gridCols, setGridCols] = useState<number>(window.innerWidth < 1000 ? 3 : 4);
//   useEffect(() => {
//     const handleResize = () => {
//       setGridCols(window.innerWidth < 1000 ? 3 : 4);
//     }
//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   return (
//     <Stack spacing={2} mb={40} style={{ padding: '10px 40px' }}>
//       <h1>Component Viewer</h1>
//       <h3>AutoAdjustButton</h3>
//       <BaseButton autoAdjustFontSize height='30px' width='100px' />
      
//       {/* テキストフィールド */}
//       <Stack direction={"row"} spacing={2} justifyContent={"space-between"}>
//         <Stack width={"100%"}>
//             <h3>BaseTextField</h3>
//             <BaseTextField value={value} setValue={setValue} placeholder="Enter text" />
//         </Stack>
//         <Stack width={"100%"}>
//             <h3>MailTextField</h3>
//             <MailTextField width='100%' value={value} setValue={setValue} error={error} setError={setError} errorText='エラー' placeholder="Enter email" />
//         </Stack>
//         <Stack width={"100%"}>
//             <h3>PhoneTextField</h3>
//             <PhoneTextField width='100%' value={value} setValue={setValue} error={false} setError={undefined} errorText='エラー' placeholder="Enter phone number" />
//         </Stack>
//       </Stack>

//       <Stack direction={"row"} spacing={6}>
//         <Stack>
//             <h3>UserIcon</h3>
//             <UserIcon size={50} image_uri={"https://lh3.googleusercontent.com/a/ACg8ocJWmDnoRVfyMaj9gf5pc5WU5pC8zkTcAgDcqOmBaur67n9fVRA=s96-c"}
//                         user_name='hello' onClick={()=>{console.log("UserIcon clicked!!")}} />
//         </Stack>
      
//         <Stack >
//             <h3>FlexDrawer</h3>
//             <BaseButton width='60px' height='30px' text='open' onClick={()=>{setOpenDrawer(true)}}/>
//             <FlexDrawer width='30%' open={openDrawer} setOpen={setOpenDrawer} >
//                 <Stack width={"100%"} height={"100%"} bgcolor={"lightgrey"}></Stack>
//             </FlexDrawer>
//         </Stack>
//       </Stack>

//       <h3>FlexCarousel</h3>
//       <FlexCarousel 
//         displayButton={false} isBanner={false} slide_min_width={440} autoScroll={true}
//         items={[object, object, object, object, object, object]} 
//       />

//       <h3>BaseGrid</h3>
//       <BaseGrid 
//         cols={gridCols}
//         items={[object, object, object, object]}
//       />

//       <h3>SwipableComponent</h3>
//       <h5>direction: {direction}</h5>
//       <SwipableStack 
//         onSwipedLeft={()=>{setDirection("left");}}
//         onSwipedRight={()=>{setDirection("right")}}
//       >
//         <Box width={300} height={200} bgcolor={"lightgrey"}/>
//       </SwipableStack>

//       <h3>Animation</h3>
//       <Stack direction={"row"} spacing={4}>
//         <h5>mode: {mode}</h5> 
//         <h5>direction: {direction}</h5>
//       </Stack>
//       <BaseButton width='10%' text='animation' onClick={()=>{setMode(mode === "1" ? "2" : "1")}}/>
//       <Stack direction={"row"} spacing={1}>
//         <BaseButton width='10%' text='left' onClick={()=>{setDirection("left")}}/>
//         <BaseButton width='10%' text='right' onClick={()=>{setDirection("right")}}/>
//       </Stack>
//       <SlideInOut>
//         {mode === "1" &&
//             <SlideComponent display={mode === "1"} key='1' 
//                 initial={direction === "right" ? "left" : 'right'} 
//                 animate='center' duration={0.15}
//                 exit={"exit"} >
//                 <Box width={300} height={200} bgcolor={"lightgrey"}/>
//             </SlideComponent>
//         }
//         {mode === "2" &&
//             <SlideComponent display={mode === "2"} key='2' 
//                 initial={direction === "right" ? "left" : 'right'} 
//                 animate='center' duration={0.15}
//                 exit={"exit"} >
//                 <Box width={300} height={200} bgcolor={"grey"}/>
//             </SlideComponent>
//         }
//       </SlideInOut>
//     </Stack>
//   );
// }

// const root = ReactDOM.createRoot(document.getElementById('root')!);
// root.render(<App />);
