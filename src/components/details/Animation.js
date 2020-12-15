export default function animation(event) {

    const card = document.querySelector(".detail-img");
    const logo = document.querySelector(".detail-img img");

    let xAxis = (window.innerWidth / 2 - event.pageX) / 25;
    let yAxis = (window.innerHeight / 2 - event.pageY) / 25;

    card.style.backgroundColor = "darkslategray";
    logo.style.transform = "translateZ(500px) rotateZ(-10deg)";

    card.addEventListener("mouseenter", (event) => {
        card.style.transition = "none";
    });

    card.addEventListener("mouseleave", (event) => {
        card.style.transition = "all 0.5s ease";
        card.style.backgroundColor = "white";
        logo.style.transform = "translateZ(0px) rotateZ(0deg)";
    });

};
