import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import gsap from "gsap";

// loading
const textureLoader = new THREE.TextureLoader()
const normalTexture = textureLoader.load('/textures/NormalMap.png')
// Debug

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereBufferGeometry(.5,64,64)

// Materials

const material = new THREE.MeshStandardMaterial()
material.metalness=0.6
material.roughness=0.4
material.normalMap=normalTexture;
material.wireframe=true

material.color = new THREE.Color(0xd4f1f9)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight(0xd4f1f9, 0.1)

pointLight.position.x = -3
pointLight.position.y = -6
pointLight.position.z = 0.45
pointLight.intensity=1
scene.add(pointLight)
// const light1=gui.addFolder("light 1")
const pointLight2 = new THREE.PointLight(0xd4f1f9, 2)
pointLight2.position.set(0.38,2.24,-0.14)
pointLight2.intensity=1
scene.add(pointLight2)
// const light2=gui.addFolder("light 2")
// light1.add(pointLight.position,'y').min(-3).max(3).step(0.01)
// light2.add(pointLight2.position,'y').min(-3).max(3).step(0.01)
// light1.add(pointLight.position,'x').min(-6).max(6).step(0.01)
// light2.add(pointLight2.position,'x').min(-6).max(6).step(0.01)
// light1.add(pointLight.position,'z').min(-3).max(3).step(0.01)
// light2.add(pointLight2.position,'z').min(-3).max(3).step(0.01)
// light1.add(pointLight,'intensity').min(0).max(10).step(0.01)
// light2.add(pointLight2,'intensity').min(0).max(10).step(0.01)


// light 3
const pointLight3=new THREE.PointLight(0xb87333,2)
pointLight3.position.set(6,0.06,-3)
pointLight3.intensity=0.8
scene.add(pointLight3)
// const light3=gui.addFolder("light 3")
// light3.add(pointLight3.position,'x').min(-6).max(6).step(0.01)
// light3.add(pointLight3.position,'y').min(-3).max(3).step(0.01)
// light3.add(pointLight3.position,'z').min(-3).max(3).step(0.01)
// light3.add(pointLight3,'intensity').min(0).max(10).step(0.01)
// const light2color={
//     color:0xffD700
// }
// light2.addColor(light2color,'color')
//     .onChange(()=>{
//         pointLight3.color.set(light2color.color)
//     })

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha:true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
document.addEventListener("mousemove",onDocumentMouseMove)
let mouseX=0
let mouseY=0

let targetX=0
let targetY=0

const windowX=window.innerWidth/2;
const windowY=window.innerHeight/2
function onDocumentMouseMove(event){
    mouseX=(event.clientX-windowX)
    mouseY=(event.clientY-windowY)
}

const updateSphere=(event)=>{
    sphere.position.y=window.scrollY*.001
    
}
window.addEventListener("scroll",updateSphere);
const clock = new THREE.Clock()

const tick = () =>
{
    targetX=mouseX*.001
    targetY=mouseY*.001
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime
    sphere.rotation.y+=.05*(targetX-sphere.rotation.y)
    sphere.rotation.x+=.05*(targetY-sphere.rotation.x)
    sphere.position.z+=.10*(targetY-sphere.rotation.x)
    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

// animation start
const t1=gsap.timeline({defaults:{ease:'power1.out'}});


t1.to('.text',{y:'0%',duration:1,stagger:0.25});
t1.to('.slider',{y:'-100%',duration:1.5,delay:0.5});

t1.to('.intro',{y:'-100%',duration:1},"-=1.2");
t1.fromTo('nav',{opacity:0},{opacity:1,duration:1});
t1.fromTo('.bigtext',{opacity:0},{opacity:1,duration:1});

// jn
var tl = new TimelineMax({onUpdate:updatePercentage});
var tl2 = new TimelineMax();
const controller = new ScrollMagic.Controller();

tl.from('blockquote', .5, {x:200, opacity: 0});
tl.from('span', 1, { width: 0}, "=-.5");
tl.from('#office', 1, {x:-200, opacity: 0,ease: Power4.easeInOut}, "=-1");
tl.from('#building', 1, {x:200, opacity: 0, ease: Power4.easeInOut}, "=-.7");

tl2.from("#box", 1, {opacity: 0, scale: 0});
tl2.to("#box", .5, {left: "20%", scale: 1.3, borderColor: 'white', borderWidth: 12, boxShadow: '1px 1px 0px 0px rgba(0,0,0,0.09)'})

const scene1 = new ScrollMagic.Scene({
  triggerElement: ".sticky",
            triggerHook: "onLeave",
            duration: "100%"
})
  .setPin(".sticky")
  .setTween(tl)
		.addTo(controller);

const scene2 = new ScrollMagic.Scene({
  triggerElement: "blockquote"
})
  .setTween(tl2)
		.addTo(controller);


function updatePercentage() {
  //percent.innerHTML = (tl.progress() *100 ).toFixed();
  tl.progress();
  console.log(tl.progress());
}






const circleSvg = document.querySelector('svg')
const btn = document.querySelector('button')

let MouseX = 0
let MouseY = 0
//let intv = 0

window.addEventListener('mousemove', (event) => {
    // circleSvg.style.top = event.clientY - 45;
    // circleSvg.style.left = event.clientX - 45;

    MouseY = (event.clientY / 16) - (45 / 16) + 'rem'
    MouseX = (event.clientX / 16) - (45 / 16) + 'rem'
})

const mouseMove = () => {
    //intv += 1
    
    circleSvg.style.top = MouseY
    circleSvg.style.left = MouseX

    //circleSvg.style.opacity = 1 + Math.sin(intv * .04)
    //console.log(Math.sin(intv * .04))

    window.requestAnimationFrame(mouseMove)
}

mouseMove()

var tl = gsap.timeline({defaults: {ease: "power2.inOut"}})

tl.to(circleSvg, {width: 0, opacity: 0})
tl.to('body, button', {background: 'white'})
tl.pause()

btn.addEventListener('click', () => {
    tl.play()
})




