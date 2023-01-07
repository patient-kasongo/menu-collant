(function(){
    let scrollY=function(){
        let supportPageOffset=window.pageXOffset !== undefined;
        let isCSS1Compact= ((document.compatMode || "") === "CSS1Compat");
        return supportPageOffset ? window.pageYOffset : isCSS1Compact ? document.documentElement.scrollTop:document.body.scrollTop;
    }
    let makeSticky=function(element){
        let rect=element.getBoundingClientRect()
        let offSet=parseInt(element.getAttribute('data-offset') || 0 ,10)
        let constraint=document.querySelector(element.getAttribute('data-constraint'))
        let constraintRect=constraint.getBoundingClientRect()
        let constraintBottom=constraintRect.top + scrollY() + constraintRect.height -offSet - rect.height
        let top=rect.top + scrollY()
        let fake=document.createElement('div')
        fake.style.width=rect.width+'px'
        fake.style.height=rect.height+'px'
        let onScroll=function(){
            let hasScrollClass=element.classList.contains('fixed')
            if(scrollY()>constraintBottom && element.style.position != 'absolute'){
                element.style.position='absolute'
                element.style.bottom='0'
                element.style.top='auto'
            } else if(scrollY()>constraintBottom){

            }else if(scrollY()> top - offSet && element.style.position !='fixed'){
                element.classList.add('fixed')
                element.style.position='fixed'
                element.style.top=offSet+'px'
                element.style.bottom='auto'
                element.parentNode.insertBefore(fake,element)
                element.style.width=rect.width+'px'
                /*
                element.style.position="fixed"
                element.style.top="0px"
                */
            }else if(scrollY()<top - offSet && element.style.position != 'static'){
                element.classList.remove('fixed')
                element.style.position='static'
                if(element.parentNode.contains(fake)){
                    element.parentNode.removeChild(fake)
                }
            }
        }
        let onResize=function(){
            element.style.width='auto'
            element.style.height='auto'
            fake.style.display='none'
            element.classList.remove('fixed')
            element.style.position='static'
            rect=element.getBoundingClientRect()
            constraintRect=constraint.getBoundingClientRect()
            constraintBottom=constraintRect.top + scrollY() + constraintRect.height -offSet - rect.height
            top=rect.top + scrollY()
            fake.style.display='block'
            fake.style.width=rect.width+'px'
            fake.style.height=rect.height+'px'
            onScroll()
        }
        window.addEventListener('scroll', onScroll)
        window.addEventListener('resize',onResize)
    }
    /*
    LORSQU'ON scroll l'écran
        Si le menu sors de l'écran
        Aors il déviendra fixe
    */
    let elements=document.querySelectorAll('[data-sticky]')
    for(let i=0;i<elements.length;i++){
        makeSticky(elements[i])
    }
})()
