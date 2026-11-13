// BaseStrength of 100 is max, -100 does opposite effect.
// 
// 50 is for all primary alchemical components.
function getIngredient(str: string) {
    for (let i = 1; i < Ingredients.length; i++) {
        if (Ingredients[i][0] === str) {
            return Ingredients[i];
        }
    }
    console.log("No output value")
    return []
}
function PotionColorSet(PotionAsset: Image, R: number, G: number, B: number) {

}
function includes(arr: string[], str: string) {
    return arr.indexOf(str) != -1
}
function createPotion(Ingredient1: string, Ingredient2: string, Base: any[]) {
    ing1 = getIngredient(Ingredient1)
    ing2 = getIngredient(Ingredient2)
    matchingEffects = []
    aeffects = []
    if (ing1.length == 0 || ing2.length == 0) {
        console.log("Invalid ingredient!")
        return []
    }
    for (let a = 1; a <= 4; a++) {
        for (let b = 1; b <= 4; b++) {
            if (
                ing1[a] == ing2[b] &&
                !includes(matchingEffects, ing1[a])
            ) {
                matchingEffects.push(ing1[a]);
            }
        }
    }
    let effect;
    if (matchingEffects.length > 1) {
        effect = matchingEffects[Math.floor(Math.random() * matchingEffects.length)]
    } else if (matchingEffects.length == 0) {
        aeffects = [
            ing1[1],
            ing1[2],
            ing1[3],
            ing1[4],
            ing2[1],
            ing2[2],
            ing2[3],
            ing2[4]
        ]
        effect = aeffects[Math.floor(Math.random() * aeffects.length)]
    } else {
        effect = matchingEffects[0]
    }
    let sideffect;
    if (ing1[5] > ing2[5]) {
        sideffect = ing1[6]
    } else {
        sideffect = ing2[6]
    }
    strength = (ing1[5] + ing2[5]) / 2
    return [effect, sideffect, strength]
}
let strength = 0
let aeffects: number[] = []
let ing2: any[] = []
let ing1: any[] = []
let Ingredients: any[][] = []
let matchingEffects: any[] = []
let effect2 = ""
tiles.setCurrentTilemap(tilemap`level1`)
let ExamplePotion = ["Effect(str)", "Strength(num)", "EffectArea(num)"]
Ingredients = [
    [
        "Name",
        "E1",
        "E2",
        "E3",
        "E4",
        "BaseStrength",
        "Side-Effect",
        "Rarity"
    ],
    [
        "Mercury",
        "Poison",
        "Fire-Resistance",
        "Teeth-Growth",
        "Light",
        50,
        "D-Poison",
        "Common"
    ],
    [
        "Sulphur",
        "Fire-Breath",
        "Light",
        "Charm",
        "Strength",
        50,
        "D-Defense",
        "Common"
    ],
    [
        "Salt",
        "Resistance",
        "Charm",
        "Silence",
        "Heal",
        50,
        "D-Attack",
        "Common"
    ],
    [
        "Name",
        "E1",
        "E2",
        "E3",
        "E4",
        0,
        "D-",
        "Common"
    ]
]
console.log(createPotion("Salt", "Mercury", []))
let Test = shader.createRectangularShaderSprite(16, 16, shader.ShadeLevel.Four)
