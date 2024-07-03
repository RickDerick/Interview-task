import homeComponent from "./views/homeComponent.vue"
import orbitScrollTime from "../home/components/orbitScrollTime.vue"

export default {
    path: "/",
    component: homeComponent,
    children: [
        {
            path: "",
            name: "homeComponent",
            components:
            {
                view: orbitScrollTime,
            }
        }
    ]

}