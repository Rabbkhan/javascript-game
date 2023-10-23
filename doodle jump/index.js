document.addEventListener('DOMContentLoaded', () => {

     const  grid = document.querySelector('.grid')
     const doodler = document.createElement('div')
     let doodlerLeftSpace = 50;
     let startpoint = 150
     let doodlerBottomSpace = startpoint;
     let isGameOver = false;
     let plaformCount = 5
     let Platforms = []
     let upTimeId
     let downTimeId
     let isJumping = true
     let isGoingleft = false
     let isGoingright = false
     let leftTimeId
     let rightTimeId
     let score = 0

        function createDoodler(){
            grid.appendChild(doodler)
            doodler.classList.add('doodler')
            doodlerLeftSpace = Platforms[0].left
            doodler.style.left = doodlerLeftSpace + 'px'
            doodler.style.bottom = doodlerBottomSpace + 'px'

            
        
        }
        
        class Platform{
            constructor(newPlatBottom){
                this.bottom = newPlatBottom;
                this.left = Math.random() *315
                this.visual = document.createElement('div')
                
                const visual = this.visual
                visual.classList.add('platform') 
                visual.style.left = this.left + 'px'
                visual.style.bottom = this.bottom + 'px'
                grid.appendChild(visual)
            }
        }
        function createPlatforms(){
            for(let i = 0; i < plaformCount; i++){
                let platGap = 600 / plaformCount
                let newPlatBottom = 100 + i * platGap
                let newPlatform = new Platform(newPlatBottom )
                Platforms.push(newPlatform)
                console.log(Platforms)
            
            }
        }
        function movePlatforms(){
            if(doodlerBottomSpace > 200){
                Platforms.forEach(Platform => {
                    Platform.bottom -= 4
                    let visual = Platform.visual
                    visual.style.bottom = Platform.bottom + 'px'

                    if(Platform.bottom <10){
                        let firstPlatform = Platforms[0].visual
                        firstPlatform.classList.remove('platform')
                        Platforms.shift()
                        console.log(Platforms)
                        // let newPlatform = new Platform(600)
                        Platforms.push(newPlatform)

                    }
                })
            }
        }
         function jump(){
             clearInterval(downTimeId)
             isJumping = true
             upTimeId = setInterval(function(){
                 doodlerBottomSpace += 20
                 doodler.style.bottom = doodlerBottomSpace + 'px'
                if(doodlerBottomSpace > startpoint + 200){
                    fall()
                    isJumping = false
                }
             
                },30)
             
         }
         function fall(){
             isJumping = false
             clearInterval(upTimeId)
             downTimeId = setInterval(function (){
                 doodlerBottomSpace -= 5
                 doodler.style.bottom = doodlerBottomSpace + 'px'
                 if(doodlerBottomSpace <=0){
                     GameOver()
                 }

                 Platforms.forEach(Platform =>{
                     if(
                         (doodlerBottomSpace >= Platform.bottom)&&
                     (doodlerBottomSpace <=Platform.bottom +15)&&
                    ((doodlerLeftSpace + 60)>= Platform.left)&&
                    (doodlerLeftSpace <= (Platform.left + 85))&& !isJumping
                     ){
                         console.log('Landed')
                         startpoint = doodlerBottomSpace
                         jump()
                         isJumping = true
                     }
                     }) 
             
                },30)
         }
      
     
         
             function moveleft(){
                 if(isGoingright){

                    clearInterval(rightTimeId)
                    isGoingright = false
                 }
                isGoingleft = true
                leftTimeId = setInterval(function (){
                if(doodlerLeftSpace >=0){
                     doodlerLeftSpace -= 5
                 doodler.style.left= doodlerLeftSpace + 'px'}
                 else moveright()
                },30)
              }


             function moveright(){
                if(isGoingleft){

                    clearInterval(leftTimeId)
                    isGoingleft = false
                 }
                isGoingleft = true
                rightTimeId = setInterval(function (){
                if(doodlerLeftSpace <=340){
                     doodlerLeftSpace += 5
                 doodler.style.left= doodlerLeftSpace + 'px'}
                 else moveleft()
                },30)
              }


     
                function movestaight(){

              isGoingleft = false
               isGoingright = false
               clearInterval(leftTimeId)
               clearInterval(rightTimeId)

                }

                function control(e){
                    if (e.key === 'ArrowLeft'){
                       moveleft()
                    }else if(e.key === 'ArrowRight'){
                           moveright()
                    }
                        else if(e.key == 'ArrowUp')
                       {
                           movestaight()
                       }
                    }
                    

                function GameOver(){
                    isGameOver = true
                    while(grid.firstChild){
                        grid.removeChild(grid.firstChild)
                    }
                    grid.innerHTML =score
                    clearInterval(upTimeId)
                    clearInterval(downTimeId)
                    clearInterval(leftTimeId)
                    clearInterval(rightTimeId)
                }


        function start(){
            if(!isGameOver){
                createPlatforms()
                createDoodler()
                setInterval(movePlatforms,30)
                jump()
                document.addEventListener('keyup',control)
            }

        }
        start()

})