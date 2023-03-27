let bg =  document.querySelector(".container-wrapper");
let top_hover =  document.querySelector(".marquee");
let text_box = document.querySelector(".description");
let header = document.querySelector(".heading");

    document.getElementById('firstButton').addEventListener('click', function() {
        const x = document.getElementById("select")
        const color = x.options[x.selectedIndex].value
        top_hover.style.backgroundColor=color;
        bg.style.backgroundColor=color;
        text_box.style.backgroundColor=color;
        document.getElementsByClassName('display-image')[0].style.backgroundColor = color
    })

    document.getElementById('secondButton').addEventListener('click', function() {
        let x =document.getElementById("select1");
        document.body.style.color=x.options[x.selectedIndex].value;
        top_hover.style.color=x.options[x.selectedIndex].value;
        header.style.color =x.options[x.selectedIndex].value;
    })

    document.getElementById('resetButton').addEventListener('click',()=>{
        window.location.reload();
    });




    const listener = document.getElementsByClassName("picture")
    for (let i=0; i<listener.length; i++) {
        const currentElement = listener[i]
        currentElement.addEventListener('mouseover', function() {
            const source = currentElement.id;
            document.getElementsByClassName('display-image')[0].style.opacity = "1";
            if (source === "one") {
                document.getElementById("img-main").src = "backpack.png"
                document.getElementById('heading').innerHTML = 'Backpack'
                document.getElementById('description').innerHTML = `Travel-friendly backpacks are front-loading, so they zip open more like a suitcase and it's easy to locate gear quickly. STRAP TYPES – A padded waist strap distributes the weight of your backpack on your core, instead of just your shoulders. Backpacks are quite possibly the perfect bag for just about everyone. They are lightweight, simple and handy and they are great for everyday use. No matter what you need to carry, from books and your laptop to camera equipment, clothing, lunch or your gym gear, a backpack will make the task that much easier. In fact, travel experts from all over the world recommend using a backpack as they can make travelling easier and a lot more fun.`
            } else if (source === "two") {
                document.getElementById("img-main").src = "compass.png"
                document.getElementById('heading').innerHTML = 'Compass'
                document.getElementById('description').innerHTML = 'A compass is one of the most basic navigation tools any hiker can own. It needs no batteries, works with any map, and even works without a map! While entire books have been written about navigating with a compass. The compass is used for navigation, location and direction. People use it to find their way, whether it is on a hiking trail or on a trip to a new location. It is an instrument composed of a suspended magnetic pointer that is attracted to the polarity of the North Pole.'

            }else if(source === "three"){
                document.getElementById("img-main").src = "emergency_shelter.png"
                document.getElementById('heading').innerHTML = 'Emergency Shelter'
                document.getElementById("description").innerHTML='Shelter is a basic human need crucial for survival in cases of natural hazards or conflict. It provides security, personal safety and protection from the weather, and prevents ill health and disease. Emergency shelters play a critical role in a community\'s homelessness response system. They provide an immediate place to stay while people reconnect with housing. Shelters work best when people can enter and exit rapidly, with an appropriate level of services for their needs.'

            }else if(source==="four"){
                document.getElementById("img-main").src = "first_aid.png"
                document.getElementById('heading').innerHTML = 'First Aid'
                document.getElementById("description").innerHTML='First aid can save lives. No matter how careful you are, injuries can happen when you travel abroad. That is why travelling with a first aid kit is always a good idea. Your travel first aid kit should contain basic supplies to treat minor cuts and illnesses, stomach issues and other pre-existing medical condition. When it comes to more serious injuries, first aid provides an essential role in keeping a casualty from getting worse and helps to stabilise their condition before professional help can arrive.'
            }else if(source==="five"){
                document.getElementById("img-main").src = "gloves.png"
                document.getElementById('heading').innerHTML = 'Gloves'
                document.getElementById("description").innerHTML='When to Wear Gloves. Gloves help keep your hands clean and lessen your chance of getting germs that can make you sick. Wear gloves every time you touch blood, bodily fluids, bodily tissues, mucous membranes, or broken skin. Disposable gloves can reduce the spread of infection and protect someone who is going out in public by keeping their hands clean, dry and germ free. If someone chooses to wear gloves in public it is vital they do not touch their face, phone or any surfaces they do not need to and remove the gloves correctly.'
            }
        })
}