const categories = [
    {
        _id: "category_trasition-services",
        name: "Transition Services",
        desc: "blah",
        type: "category"
    }

]


const persons = [
    {
        _id: "person_jeff-smith"
        firstName: "Jeff",
        lastName: "Smith",
        heightIn: 66,
        weightLbs: 234,
        type: "person"
    },
    {
        _id: "person_mary-smith"
        firstName: "Mary",
        lastName: "Smith",
        heightIn: 52,
        weightLbs: 123,
        type: "person"
    }
]

const workouts = [
    {
        _id: "workout_mary_smith_2018-07-26T07:40:23Z",
        dateTime: "2018-07-26T07:40:23Z",
        personId: "person_mary-smith",
        type: "workout",
        category: "Run",
        distance: {
            length: 5,
            unit: "mi"
        }
    }

]