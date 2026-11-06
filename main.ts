scene.onOverlapTile(SpriteKind.Player, assets.tile`Over2`, function (sprite, location) {
    if (sprite == sprites.readDataSprite(Something, "S-Control") && Turnstate == 0) {
        if (sprites.readDataString(sprites.readDataSprite(Something, "S-Control"), "EnemyAI") == "up") {
            LocationY += -2
        } else if (sprites.readDataString(sprites.readDataSprite(Something, "S-Control"), "EnemyAI") == "down") {
            LocationY += 2
        } else {
            if (characterAnimations.matchesRule(sprite, characterAnimations.rule(Predicate.FacingLeft))) {
                LocationX += -2
            }
            if (characterAnimations.matchesRule(sprite, characterAnimations.rule(Predicate.FacingRight))) {
                LocationX += 2
            }
        }
    }
    CreateWorld(LocationX, LocationY, 1, 1, 1)
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (sprites.readDataBoolean(sprites.readDataSprite(Something, "S-Control"), "Ghost") || !(tiles.tileAtLocationIsWall(tiles.getTileLocation(sprites.readDataSprite(Something, "S-Control").tilemapLocation().column, -1 + sprites.readDataSprite(Something, "S-Control").tilemapLocation().row)))) {
        sprites.setDataString(sprites.readDataSprite(Something, "S-Control"), "EnemyAI", "up")
        if (sprites.readDataBoolean(sprites.readDataSprite(Something, "S-Control"), "PC-Steps")) {
            Customeffects("Steps", sprites.readDataSprite(Something, "S-Control"), false, sprites.readDataSprite(Something, "S-Control").x, sprites.readDataSprite(Something, "S-Control").y, 400)
        }
        if (Turnstate == 0 || (sprites.readDataSprite(Something, "S-Control") == Something || sprites.readDataSprite(Something, "S-Control") == Aimer)) {
            grid.move(sprites.readDataSprite(Something, "S-Control"), 0, -1)
        } else {
            if (sprites.readDataNumber(sprites.readDataSprite(Something, "S-Control"), "PC-Movement") > 0) {
                sprites.changeDataNumberBy(sprites.readDataSprite(Something, "S-Control"), "PC-Movement", -1)
                grid.move(sprites.readDataSprite(Something, "S-Control"), 0, -1)
            }
        }
        if (Aimer) {
            if (spriteutils.distanceBetween(sprites.readDataSprite(Aimer, "S-Owner"), Aimer) > sprites.readDataNumber(Aimer, "A-MaxDistance")) {
                grid.place(Aimer, tiles.getTileLocation(grid.spriteCol(sprites.readDataSprite(Aimer, "S-Owner")), grid.spriteRow(sprites.readDataSprite(Aimer, "S-Owner"))))
            }
        }
    }
})
function MenuImgs (Sprite2: Sprite, Slot: string) {
    if (Slot == "Sword") {
        Sprite2.setImage(assets.image`SwordAM`)
    } else if (Slot == "Wand") {
        Sprite2.setImage(assets.image`WandAM`)
    } else if (Slot == "Shield") {
        Sprite2.setImage(assets.image`ShieldAM`)
    } else if (Slot == "Sling") {
        Sprite2.setImage(img`
            . f f f f f f f f f . 
            f f b b b b b b b f f 
            f b b b b b b b b b f 
            f b b e d b b d e b f 
            f b b d e b d b e b f 
            f b d 1 e b d b e b f 
            f b d 1 1 e b b e b f 
            f b b d d b e b e b f 
            f b b b b b b e b b f 
            f f b b b b b e b f f 
            . f f f f f f f f f . 
            `)
    } else if (Slot == "Green") {
        Sprite2.setImage(assets.image`GreenAM`)
    } else if (Slot == "Storm") {
        Sprite2.setImage(assets.image`StormAM`)
    } else if (Slot == "Arrow") {
        Sprite2.setImage(assets.image`MagicArrowAM`)
    } else if (Slot == "Crossbow") {
        Sprite2.setImage(assets.image`CrossBowAM`)
    } else if (Slot == "Spear") {
        Sprite2.setImage(assets.image`SpearAM`)
    } else if (Slot == "Willpower") {
        Sprite2.setImage(assets.image`WillPowerAM`)
    } else if (Slot == "Dagger") {
        Sprite2.setImage(assets.image`DaggerAM`)
    } else if (Slot == "Great") {
        Sprite2.setImage(img`
            . f f f f f f f f f . 
            f f b b b b b b b f f 
            f b b b b b d 1 1 b f 
            f b b b b d 1 1 1 b f 
            f c c b d 1 1 1 1 b f 
            f c c c 1 1 1 1 b b f 
            f b c c c 1 1 b b b f 
            f c c c c c b b b b f 
            f c c c c c c b b b f 
            f f c c b c c b b f f 
            . f f f f f f f f f . 
            `)
    } else if (Slot == "FireBall") {
        Sprite2.setImage(img`
            . f f f f f f f f f . 
            f f b b b b b b 4 f f 
            f b b b b 4 b 4 b b f 
            f b 4 b 4 b b b 5 b f 
            f b 2 4 b b 5 4 4 b f 
            f b b 4 5 2 2 4 b b f 
            f 4 b 4 5 5 5 5 b b f 
            f b b 4 4 5 5 2 b 4 f 
            f b 4 2 4 4 4 2 b b f 
            f f b b 4 2 2 b b f f 
            . f f f f f f f f f . 
            `)
    } else {
    	
    }
}
scene.onPathCompletion(SpriteKind.Enemy, function (sprite, location) {
    if (sprite.overlapsWith(sprites.readDataSprite(sprite, "E-Target"))) {
        sprites.changeDataNumberBy(sprites.readDataSprite(sprite, "E-Target"), "HP", -1 * sprites.readDataNumber(sprite, "DATA-DMG"))
    }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (sprites.readDataSprite(Something, "S-Control") != Something && (Turnstate == 0 || sprites.readDataNumber(sprites.readDataSprite(Something, "S-Control"), "PC-Actions") > 0)) {
        CreateSelectionMenu(sprites.readDataSprite(Something, "S-Control"))
    }
})
function CreatePC (Class: string, Lvl: number) {
    mySprite = sprites.create(assets.image`Sir Red`, SpriteKind.Player)
    sprites.setDataBoolean(mySprite, "PC-Steps", true)
    if (Class == "Sir.Red") {
        characterAnimations.loopFrames(
        mySprite,
        assets.animation`SirRedL`,
        300,
        characterAnimations.rule(Predicate.FacingLeft)
        )
        characterAnimations.loopFrames(
        mySprite,
        assets.animation`SirRedR`,
        300,
        characterAnimations.rule(Predicate.FacingRight)
        )
        sprites.setDataNumber(mySprite, "MaxHP", 5 * Lvl)
        sprites.setDataString(mySprite, "Mhand", "Great")
        sprites.setDataString(mySprite, "Ohand", "Sling")
        sprites.setDataString(mySprite, "Spell1", "Willpower")
    } else if (Class == "Dr.Purple") {
        characterAnimations.loopFrames(
        mySprite,
        assets.animation`MrPurpleL`,
        300,
        characterAnimations.rule(Predicate.FacingLeft)
        )
        characterAnimations.loopFrames(
        mySprite,
        assets.animation`MrPurpleR`,
        300,
        characterAnimations.rule(Predicate.FacingRight)
        )
        sprites.setDataNumber(mySprite, "MaxHP", 3 * Lvl)
        sprites.setDataString(mySprite, "Ohand", "Spear")
        sprites.setDataString(mySprite, "Mhand", "Wand")
        sprites.setDataString(mySprite, "Spell1", "FireBall")
    } else if (Class == "Mr.Green") {
        characterAnimations.loopFrames(
        mySprite,
        assets.animation`GreenR`,
        300,
        characterAnimations.rule(Predicate.FacingRight)
        )
        characterAnimations.loopFrames(
        mySprite,
        assets.animation`GreenL`,
        300,
        characterAnimations.rule(Predicate.FacingLeft)
        )
        sprites.setDataNumber(mySprite, "MaxHP", 4 * Lvl)
        sprites.setDataString(mySprite, "Mhand", "Crossbow")
        sprites.setDataString(mySprite, "Spell1", "Green")
        sprites.setDataString(mySprite, "Ohand", "Storm")
    }
    sprites.setDataNumber(mySprite, "HP", sprites.readDataNumber(mySprite, "MaxHP"))
    CurrentParty.push(mySprite)
    ChangeActiveMember()
    UpdateEquiped(mySprite, sprites.readDataString(mySprite, "Mhand"), true)
    UpdateEquiped(mySprite, sprites.readDataString(mySprite, "Ohand"), false)
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Player, function (sprite, otherSprite) {
    if (sprites.readDataSprite(sprite, "S-Owner") != otherSprite) {
        sprite.setVelocity(0, 0)
        sprite.setFlag(SpriteFlag.Ghost, true)
        sprites.changeDataNumberBy(otherSprite, "HP", -1 * sprites.readDataNumber(sprite, "DATA-DMG"))
        if (sprites.readDataNumber(otherSprite, "HP") <= 0) {
            grid.remove(otherSprite)
            Customeffects("BigSteps", otherSprite, true, 1, 1, 500)
        }
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (sprites.readDataBoolean(sprites.readDataSprite(Something, "S-Control"), "Ghost") || !(tiles.tileAtLocationIsWall(tiles.getTileLocation(-1 + sprites.readDataSprite(Something, "S-Control").tilemapLocation().column, sprites.readDataSprite(Something, "S-Control").tilemapLocation().row)))) {
        sprites.setDataString(sprites.readDataSprite(Something, "S-Control"), "EnemyAI", "N/a")
        if (sprites.readDataBoolean(sprites.readDataSprite(Something, "S-Control"), "PC-Steps")) {
            Customeffects("Steps", sprites.readDataSprite(Something, "S-Control"), false, sprites.readDataSprite(Something, "S-Control").x, sprites.readDataSprite(Something, "S-Control").y, 400)
        }
        if (Turnstate == 0 || (sprites.readDataSprite(Something, "S-Control") == Something || sprites.readDataSprite(Something, "S-Control") == Aimer)) {
            grid.move(sprites.readDataSprite(Something, "S-Control"), -1, 0)
        } else {
            if (sprites.readDataNumber(sprites.readDataSprite(Something, "S-Control"), "PC-Movement") > 0) {
                sprites.changeDataNumberBy(sprites.readDataSprite(Something, "S-Control"), "PC-Movement", -1)
                grid.move(sprites.readDataSprite(Something, "S-Control"), -1, 0)
            }
        }
        if (Aimer) {
            if (spriteutils.distanceBetween(sprites.readDataSprite(Aimer, "S-Owner"), Aimer) > sprites.readDataNumber(Aimer, "A-MaxDistance")) {
                grid.place(Aimer, tiles.getTileLocation(grid.spriteCol(sprites.readDataSprite(Aimer, "S-Owner")), grid.spriteRow(sprites.readDataSprite(Aimer, "S-Owner"))))
            }
        }
    }
})
function Surface (X: number, Y: number, Time: number) {
    if (X == 2 && Y == 0) {
        tiles.loadMap(tiles.createSmallMap(tilemap`level18`))
        TurnState(2)
    } else if (X == 1 && Y == 0) {
        tiles.loadMap(tiles.createSmallMap(tilemap`level15`))
    } else if (X == 0 && Y == 1) {
        tiles.loadMap(tiles.createSmallMap(tilemap`level6`))
        TurnState(2)
    } else if (X == 1 && Y == 1) {
        tiles.loadMap(tiles.createSmallMap(tilemap`TestingRoom`))
    } else if (X == 2 && Y == 1) {
        tiles.loadMap(tiles.createSmallMap(tilemap`level9`))
        TurnState(2)
    } else if (X == 1 && Y == 2) {
        tiles.loadMap(tiles.createSmallMap(tilemap`level12`))
        TurnState(2)
    } else if (X == 1 && Y == 3) {
        tiles.loadMap(tiles.createSmallMap(tilemap`level21`))
        TurnState(2)
    } else if (X == 3 && Y == 0) {
        tiles.loadMap(tiles.createSmallMap(tilemap`level24`))
    } else if (false) {
    	
    } else {
    	
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`Over1`, function (sprite, location) {
    if (sprite == sprites.readDataSprite(Something, "S-Control") && Turnstate == 0) {
        if (sprites.readDataString(sprites.readDataSprite(Something, "S-Control"), "EnemyAI") == "up") {
            LocationY += -1
        } else if (sprites.readDataString(sprites.readDataSprite(Something, "S-Control"), "EnemyAI") == "down") {
            LocationY += 1
        } else {
            if (characterAnimations.matchesRule(sprite, characterAnimations.rule(Predicate.FacingLeft))) {
                LocationX += -1
            }
            if (characterAnimations.matchesRule(sprite, characterAnimations.rule(Predicate.FacingRight))) {
                LocationX += 1
            }
        }
    }
    CreateWorld(LocationX, LocationY, 1, 1, 1)
})
function CreateProj (Owner: Sprite, Target: Sprite, Img: Image, Speed: number, Lspan: number, Dmg: number) {
    Placeholder = sprites.create(Img, SpriteKind.Projectile)
    sprites.setDataSprite(Placeholder, "S-Owner", Owner)
    sprites.setDataNumber(Placeholder, "DATA-DMG", Dmg)
    Placeholder.setFlag(SpriteFlag.DestroyOnWall, true)
    Placeholder.lifespan = Lspan
    Placeholder.setPosition(Owner.x, Owner.y)
    spriteutils.setVelocityAtAngle(Placeholder, spriteutils.angleFrom(Owner, Target), Speed)
}
sprites.onOverlap(SpriteKind.Stupid, SpriteKind.Menu, function (sprite, otherSprite) {
    if (controller.A.isPressed()) {
        if (sprites.readDataNumber(otherSprite, "MultuseNUM") == 1) {
            sprites.setDataSprite(Something, "S-Control", sprites.readDataSprite(Something, "S-Owner"))
            ActiveMember += -1
            sprites.destroyAllSpritesOfKind(SpriteKind.Menu)
            pauseUntil(() => !(controller.A.isPressed()))
            UseItem(sprites.readDataSprite(Something, "S-Control"), sprites.readDataString(otherSprite, "MenuSelect"))
        }
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (sprites.readDataBoolean(sprites.readDataSprite(Something, "S-Control"), "Ghost") || !(tiles.tileAtLocationIsWall(tiles.getTileLocation(1 + sprites.readDataSprite(Something, "S-Control").tilemapLocation().column, sprites.readDataSprite(Something, "S-Control").tilemapLocation().row)))) {
        sprites.setDataString(sprites.readDataSprite(Something, "S-Control"), "EnemyAI", "N/a")
        if (sprites.readDataBoolean(sprites.readDataSprite(Something, "S-Control"), "PC-Steps")) {
            Customeffects("Steps", sprites.readDataSprite(Something, "S-Control"), false, sprites.readDataSprite(Something, "S-Control").x, sprites.readDataSprite(Something, "S-Control").y, 400)
        }
        if (Turnstate == 0 || (sprites.readDataSprite(Something, "S-Control") == Something || sprites.readDataSprite(Something, "S-Control") == Aimer)) {
            grid.move(sprites.readDataSprite(Something, "S-Control"), 1, 0)
        } else {
            if (sprites.readDataNumber(sprites.readDataSprite(Something, "S-Control"), "PC-Movement") > 0) {
                sprites.changeDataNumberBy(sprites.readDataSprite(Something, "S-Control"), "PC-Movement", -1)
                grid.move(sprites.readDataSprite(Something, "S-Control"), 1, 0)
            }
        }
        if (Aimer) {
            if (spriteutils.distanceBetween(sprites.readDataSprite(Aimer, "S-Owner"), Aimer) > sprites.readDataNumber(Aimer, "A-MaxDistance")) {
                grid.place(Aimer, tiles.getTileLocation(grid.spriteCol(sprites.readDataSprite(Aimer, "S-Owner")), grid.spriteRow(sprites.readDataSprite(Aimer, "S-Owner"))))
            }
        }
    }
})
function Customeffects (Type: string, Sprite2: Sprite, Onsprite: boolean, X: number, Y: number, Time: number) {
    if (Type == "Steps") {
        myEffect = extraEffects.createCustomSpreadEffectData(
        [1, 13],
        true,
        extraEffects.createPresetSizeTable(ExtraEffectPresetShape.Spark),
        extraEffects.createPercentageRange(0, 0),
        extraEffects.createPercentageRange(0, 0),
        extraEffects.createTimeRange(500, 400),
        0,
        0,
        extraEffects.createPercentageRange(50, 100),
        0,
        0,
        200
        )
        myEffect.z = -1
    } else if (Type == "Wand") {
        myEffect = extraEffects.createCustomSpreadEffectData(
        [8, 6, 9],
        false,
        extraEffects.createShrinkingSizeTable(8),
        extraEffects.createPercentageRange(0, 0),
        extraEffects.createPercentageRange(20, 20),
        extraEffects.createTimeRange(200, 600),
        0,
        0,
        extraEffects.createPercentageRange(50, 100),
        0,
        0,
        200
        )
        myEffect.z = -1
    } else if (Type == "Greenwand") {
        myEffect = extraEffects.createCustomSpreadEffectData(
        [
        7,
        6,
        7,
        6
        ],
        false,
        extraEffects.createShrinkingSizeTable(8),
        extraEffects.createPercentageRange(0, 0),
        extraEffects.createPercentageRange(20, 20),
        extraEffects.createTimeRange(200, 600),
        0,
        0,
        extraEffects.createPercentageRange(50, 100),
        0,
        0,
        200
        )
        myEffect.z = -1
    } else if (Type == "BigSteps") {
        myEffect = extraEffects.createCustomSpreadEffectData(
        [1, 13],
        true,
        extraEffects.createShrinkingSizeTable(13),
        extraEffects.createPercentageRange(0, 0),
        extraEffects.createPercentageRange(0, 0),
        extraEffects.createTimeRange(500, 400),
        0,
        0,
        extraEffects.createPercentageRange(50, 100),
        0,
        0,
        200
        )
    } else if (Type == "SSteps") {
        myEffect = extraEffects.createCustomSpreadEffectData(
        [1, 13],
        true,
        extraEffects.createPresetSizeTable(ExtraEffectPresetShape.Spark),
        extraEffects.createPercentageRange(0, 0),
        extraEffects.createPercentageRange(0, 0),
        extraEffects.createTimeRange(200, 100),
        0,
        0,
        extraEffects.createPercentageRange(50, 100),
        0,
        0,
        200
        )
    } else if (Type == "Fire") {
        myEffect = extraEffects.createCustomSpreadEffectData(
        [
        4,
        2,
        4,
        5,
        13
        ],
        true,
        extraEffects.createShrinkingSizeTable(8),
        extraEffects.createPercentageRange(0, 0),
        extraEffects.createPercentageRange(20, 20),
        extraEffects.createTimeRange(500, 600),
        0,
        -5,
        extraEffects.createPercentageRange(50, 100),
        0,
        0,
        200
        )
    } else if (Type == "Fireball") {
        myEffect = extraEffects.createCustomSpreadEffectData(
        [
        4,
        2,
        4,
        5,
        1
        ],
        true,
        extraEffects.createShrinkingSizeTable(36),
        extraEffects.createPercentageRange(0, 0),
        extraEffects.createPercentageRange(40, 20),
        extraEffects.createTimeRange(500, 600),
        0,
        -5,
        extraEffects.createPercentageRange(50, 100),
        0,
        0,
        200
        )
    } else {
    	
    }
    if (Onsprite) {
        extraEffects.createSpreadEffectOnAnchor(Sprite2, myEffect, Time)
    } else {
        extraEffects.createSpreadEffectAt(myEffect, X, Y, Time)
    }
}
function UpdateEquiped (Owner: Sprite, Slot: string, MainOff: boolean) {
    if (Slot == "Sword") {
        Placeholder = sprites.create(assets.image`Sword`, SpriteKind.PlaceHolder)
    }
    if (Slot == "Wand") {
        Placeholder = sprites.create(assets.image`Wand`, SpriteKind.PlaceHolder)
    }
    if (Slot == "Sling") {
        Placeholder = sprites.create(assets.image`SlingShot`, SpriteKind.PlaceHolder)
    }
    if (Slot == "Shield") {
        Placeholder = sprites.create(assets.image`Shield`, SpriteKind.PlaceHolder)
    }
    if (Slot == "Spear") {
        Placeholder = sprites.create(assets.image`Spear`, SpriteKind.PlaceHolder)
    }
    if (Slot == "Greatsword") {
        Placeholder = sprites.create(assets.image`GreatSword`, SpriteKind.PlaceHolder)
    }
    if (Slot == "Crossbow") {
        Placeholder = sprites.create(assets.image`CrossBow`, SpriteKind.PlaceHolder)
    }
    if (Slot == "Dagger") {
        Placeholder = sprites.create(assets.image`Dagger`, SpriteKind.PlaceHolder)
    }
    if (Slot == "Green") {
        Placeholder = sprites.create(assets.image`GreenBook`, SpriteKind.PlaceHolder)
    }
    if (Slot == "Great") {
        Placeholder = sprites.create(assets.image`GreatSword`, SpriteKind.PlaceHolder)
    }
    if (MainOff) {
        sprites.setDataSprite(Owner, "H-Hand", Placeholder)
    } else {
        sprites.setDataSprite(Owner, "H-Offhand", Placeholder)
    }
}
function CreateWorld (X: number, Y: number, num: number, Floor: number, Time: number) {
    if (Floor == 1) {
        Surface(X, Y, Time)
    }
    zzArrayLocationHolder = []
    for (let value of tiles.getTilesByType(assets.tile`Over1`)) {
        zzArrayLocationHolder.push(value)
    }
    for (let value2 of tiles.getTilesByType(assets.tile`Over2`)) {
        zzArrayLocationHolder.push(value2)
    }
    if (sprites.readDataString(sprites.readDataSprite(Something, "S-Control"), "EnemyAI") == "down") {
        zzNumHolder1 = 256
        for (let value3 of zzArrayLocationHolder) {
            if (zzNumHolder1 > value3.row) {
                grid.place(sprites.readDataSprite(Something, "S-Control"), tiles.getTileLocation(value3.column, 1 + value3.row))
                zzNumHolder1 = value3.row
            }
        }
        for (let index = 0; index < -1 + CurrentParty.length; index++) {
            ActiveMember += 1
            if (ActiveMember >= CurrentParty.length) {
                ActiveMember = 0
            } else if (ActiveMember < 0) {
                ActiveMember = 0
            }
            grid.place(CurrentParty[ActiveMember], tiles.getTileLocation(1 + sprites.readDataSprite(Something, "S-Control").tilemapLocation().column, sprites.readDataSprite(Something, "S-Control").tilemapLocation().row))
        }
    } else if (sprites.readDataString(sprites.readDataSprite(Something, "S-Control"), "EnemyAI") == "up") {
        zzNumHolder1 = 0
        for (let value4 of zzArrayLocationHolder) {
            if (value4.row > zzNumHolder1) {
                grid.place(sprites.readDataSprite(Something, "S-Control"), tiles.getTileLocation(value4.column, -1 + value4.row))
                zzNumHolder1 = value4.row
            }
        }
        for (let index = 0; index < -1 + CurrentParty.length; index++) {
            ActiveMember += 1
            if (ActiveMember >= CurrentParty.length) {
                ActiveMember = 0
            } else if (ActiveMember < 0) {
                ActiveMember = 0
            }
            grid.place(CurrentParty[ActiveMember], tiles.getTileLocation(1 + sprites.readDataSprite(Something, "S-Control").tilemapLocation().column, sprites.readDataSprite(Something, "S-Control").tilemapLocation().row))
        }
    } else {
        if (characterAnimations.matchesRule(sprites.readDataSprite(Something, "S-Control"), characterAnimations.rule(Predicate.FacingLeft))) {
            zzNumHolder1 = 0
            for (let value5 of zzArrayLocationHolder) {
                if (zzNumHolder1 < value5.column) {
                    grid.place(sprites.readDataSprite(Something, "S-Control"), tiles.getTileLocation(-1 + value5.column, value5.row))
                    zzNumHolder1 = value5.column
                }
            }
        } else if (characterAnimations.matchesRule(sprites.readDataSprite(Something, "S-Control"), characterAnimations.rule(Predicate.FacingRight))) {
            zzNumHolder1 = 256
            for (let value6 of zzArrayLocationHolder) {
                if (zzNumHolder1 > value6.column) {
                    grid.place(sprites.readDataSprite(Something, "S-Control"), tiles.getTileLocation(1 + value6.column, value6.row))
                    zzNumHolder1 = value6.column
                }
            }
        }
        for (let index = 0; index < -1 + CurrentParty.length; index++) {
            ActiveMember += 1
            if (ActiveMember >= CurrentParty.length) {
                ActiveMember = 0
            } else if (ActiveMember < 0) {
                ActiveMember = 0
            }
            grid.place(CurrentParty[ActiveMember], tiles.getTileLocation(sprites.readDataSprite(Something, "S-Control").tilemapLocation().column, 1 + sprites.readDataSprite(Something, "S-Control").tilemapLocation().row))
        }
    }
    ActiveMember += 1
    for (let value7 of tiles.getTilesByType(assets.tile`SlimePlacer`)) {
        CreateEnemy(assets.image`Insert Terraria joke`, "Chase", 5, 2, "Slime", 4)
        tiles.placeOnTile(Placeholder, value7)
        tiles.setTileAt(value7, assets.tile`transparency8`)
    }
    for (let value8 of tiles.getTilesByType(assets.tile`FSlmPlacer`)) {
        CreateEnemy(assets.image`Fire Slime`, "FindShoot", 4, 3, "FlSlm", 6)
        tiles.placeOnTile(Placeholder, value8)
        tiles.setTileAt(value8, assets.tile`transparency8`)
    }
    tiles.replaceAllTiles(assets.tile`SlimePlacer`, assets.tile`transparency8`)
    tiles.replaceAllTiles(assets.tile`FSlmPlacer`, assets.tile`transparency8`)
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(tiles.tileAtLocationIsWall(tiles.getTileLocation(sprites.readDataSprite(Something, "S-Control").tilemapLocation().column, 1 + sprites.readDataSprite(Something, "S-Control").tilemapLocation().row))) || sprites.readDataBoolean(sprites.readDataSprite(Something, "S-Control"), "Ghost")) {
        sprites.setDataString(sprites.readDataSprite(Something, "S-Control"), "EnemyAI", "down")
        if (sprites.readDataBoolean(sprites.readDataSprite(Something, "S-Control"), "PC-Steps")) {
            Customeffects("Steps", sprites.readDataSprite(Something, "S-Control"), false, sprites.readDataSprite(Something, "S-Control").x, sprites.readDataSprite(Something, "S-Control").y, 400)
        }
        if (Turnstate == 0 || (sprites.readDataSprite(Something, "S-Control") == Something || sprites.readDataSprite(Something, "S-Control") == Aimer)) {
            grid.move(sprites.readDataSprite(Something, "S-Control"), 0, 1)
        } else {
            if (sprites.readDataNumber(sprites.readDataSprite(Something, "S-Control"), "PC-Movement") > 0) {
                sprites.changeDataNumberBy(sprites.readDataSprite(Something, "S-Control"), "PC-Movement", -1)
                grid.move(sprites.readDataSprite(Something, "S-Control"), 0, 1)
            }
        }
        if (Aimer) {
            if (spriteutils.distanceBetween(sprites.readDataSprite(Aimer, "S-Owner"), Aimer) > sprites.readDataNumber(Aimer, "A-MaxDistance")) {
                grid.place(Aimer, tiles.getTileLocation(grid.spriteCol(sprites.readDataSprite(Aimer, "S-Owner")), grid.spriteRow(sprites.readDataSprite(Aimer, "S-Owner"))))
            }
        }
    }
})
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    ChangeActiveMember()
})
function ChangeActiveMember () {
    if (!(sprites.readDataBoolean(Something, "CantSwap"))) {
        ActiveMember += 1
        if (ActiveMember >= CurrentParty.length) {
            ActiveMember = 0
        } else if (ActiveMember < 0) {
            ActiveMember = 0
        }
        sprites.setDataSprite(Something, "S-Control", CurrentParty[ActiveMember])
        SmartCam.follow(CurrentParty[ActiveMember], 80)
    }
    if (sprites.readDataNumber(sprites.readDataSprite(Something, "S-Control"), "HP") > sprites.readDataNumber(sprites.readDataSprite(Something, "S-Control"), "MaxHP")) {
        sprites.setDataNumber(sprites.readDataSprite(Something, "S-Control"), "HP", sprites.readDataNumber(sprites.readDataSprite(Something, "S-Control"), "MaxHP"))
    }
}
function CreateBolt (Target: Sprite, Img: Image, Lspan: number, Dmg: number) {
    Placeholder = sprites.create(Img, SpriteKind.Projectile)
    Placeholder.lifespan = Lspan
    sprites.setDataNumber(Placeholder, "DATA-DMG", Dmg)
    Placeholder.setPosition(Target.x, Target.y)
}
function TurnState (Turns: number) {
    if (Turns == 0) {
    	
    } else if (Turns == 1) {
        for (let value11 of CurrentParty) {
            sprites.setDataNumber(value11, "PC-Movement", 6)
            sprites.setDataNumber(value11, "PC-Actions", 1)
        }
    } else if (Turns == 2) {
        timer.after(1100, function () {
            if (sprites.allOfKind(SpriteKind.Enemy).length == 0) {
                TurnState(0)
            } else {
                for (let value22 of CurrentParty) {
                    sprites.setDataNumber(value22, "PC-Movement", 0)
                    sprites.setDataNumber(value22, "PC-Actions", 0)
                }
                for (let value32 of sprites.allOfKind(SpriteKind.Enemy)) {
                    EnemyActions(value32)
                }
                timer.after(1000, function () {
                    TurnState(1)
                })
            }
        })
    } else {
    	
    }
    Turnstate = Turns
}
function CreateEnemy (img2: Image, AI: string, MoveSpeed: number, Dmg: number, ExtraText: string, ExtraNum: number) {
    Placeholder = sprites.create(img2, SpriteKind.Enemy)
    sprites.setDataString(Placeholder, "EnemyAI", AI)
    sprites.setDataNumber(Placeholder, "E-Speed", MoveSpeed)
    sprites.setDataNumber(Placeholder, "DATA-DMG", Dmg)
    sprites.setDataNumber(Placeholder, "HP", ExtraNum)
    sprites.setDataSprite(Placeholder, "E-Target", CurrentParty._pickRandom())
    sprites.setDataString(Placeholder, "EnemyLooks", ExtraText)
}
function UseItem (Owner: Sprite, Item: string) {
    sprites.setDataBoolean(Something, "CantSwap", true)
    Aimer = sprites.create(assets.image`Aimer`, SpriteKind.PlaceHolder)
    sprites.setDataSprite(Aimer, "S-Owner", Owner)
    sprites.setDataSprite(Something, "S-Control", Aimer)
    Aimer.setPosition(Owner.x, Owner.y)
    if (Item == "Sword" || Item == "Dagger" || Item == "Great") {
        sprites.setDataNumber(Aimer, "A-MaxDistance", 12)
    }
    if (Item == "Spear") {
        sprites.setDataNumber(Aimer, "A-MaxDistance", 18)
    }
    if (Item == "Shield" || Item == "Willpower") {
        sprites.setDataNumber(Aimer, "A-MaxDistance", 2)
    }
    pauseUntil(() => controller.A.isPressed())
    if (Item == "Sword") {
        CreateBolt(Aimer, assets.image`Strike`, 500, 6)
    } else if (Item == "Wand") {
        CreateProj(Owner, Aimer, assets.image`WandAttack`, 120, 500, 4)
        Customeffects("Wand", Placeholder, true, 1, 1, -1)
    } else if (Item == "Sling") {
        CreateProj(Owner, Aimer, assets.image`SlingBolt`, 150, 1000, 2)
        Placeholder.setBounceOnWall(true)
        Placeholder.setFlag(SpriteFlag.DestroyOnWall, false)
    } else if (Item == "Green") {
        CreateProj(Owner, Aimer, assets.image`GreenWand`, 100, 500, -3)
        Customeffects("Greenwand", Placeholder, true, 1, 1, -1)
    } else if (Item == "Storm") {
        CreateBolt(Aimer, assets.image`Strike`, 500, 3)
        animation.runImageAnimation(
        Placeholder,
        [img`
            . . . . . . . . 
            . . . . . . . . 
            . . . 5 5 . . . 
            . . 5 5 5 5 . . 
            . . 5 5 5 5 . . 
            . . . 5 5 . . . 
            . . . . . . . . 
            . . . . . . . . 
            `,img`
            . . . 5 5 . . . 
            . 5 . . . . 5 . 
            . . . 5 5 . . . 
            5 . 5 5 5 5 . 5 
            5 . 5 5 5 5 . 5 
            . . . 5 5 . . . 
            . 5 . . . . 5 . 
            . . . 5 5 . . . 
            `,img`
            5 . . . . . . 5 
            . 5 . . . . 5 . 
            . . . 5 5 . . . 
            . . 5 . . 5 . . 
            . . 5 . . 5 . . 
            . . . 5 5 . . . 
            . 5 . . . . 5 . 
            5 . . . . . . 5 
            `,img`
            . . 5 . . 5 . . 
            . . . . . . . . 
            5 . . . 5 . . 5 
            . . 5 . . . . . 
            . . . . . 5 . . 
            5 . . 5 . . . 5 
            . . . . . . . . 
            . . 5 . . 5 . . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            `],
        100,
        false
        )
    } else if (Item == "Spear") {
        CreateBolt(Aimer, assets.image`Strike`, 500, 5)
    } else if (Item == "Dagger") {
        CreateBolt(Aimer, assets.image`Strike`, 500, 4)
    } else if (Item == "Shield") {
        sprites.changeDataNumberBy(Owner, "HP", 2)
    } else if (Item == "Willpower") {
        sprites.changeDataNumberBy(Owner, "PC-Movement", 3)
    } else if (Item == "Crossbow") {
        CreateProj(Owner, Aimer, assets.image`SlingBolt`, 170, 700, 4)
        Customeffects("SSteps", Placeholder, true, 1, 1, -1)
    } else if (Item == "Great") {
        CreateBolt(Aimer, assets.image`Strike`, 500, 7)
        scene.cameraShake(4, 200)
    } else if (Item == "FireBall") {
        CreateProj(Owner, Aimer, assets.image`FireBolt`, 140, 1000, 2)
        sprites.setDataNumber(Placeholder, "MultuseNUM", 1)
        Customeffects("Fire", Placeholder, true, 1, 1, -1)
    }
    sprites.setDataSprite(Something, "S-Control", Owner)
    sprites.destroy(Aimer)
    sprites.setDataBoolean(Something, "CantSwap", false)
    sprites.changeDataNumberBy(Owner, "PC-Actions", -1)
    if (Turnstate == 1) {
        list = 0
        for (let value42 of CurrentParty) {
            if (sprites.readDataNumber(value42, "PC-Actions") == 0) {
                list += 1
            }
        }
        if (sprites.allOfKind(SpriteKind.Enemy).length == 0) {
            TurnState(0)
        } else if (CurrentParty.length == list) {
            TurnState(2)
        }
    }
}
function EnemyActions (Enemy: Sprite) {
    if (sprites.readDataString(Enemy, "EnemyAI") == "Chase") {
        zzPathHolder = scene.aStar(Enemy.tilemapLocation(), sprites.readDataSprite(Enemy, "E-Target").tilemapLocation())
        while (sprites.readDataNumber(Enemy, "E-Speed") < zzPathHolder.length) {
            zzzSpeedLimit = zzPathHolder.pop()
        }
        scene.followPath(Enemy, zzPathHolder)
    } else if (sprites.readDataString(Enemy, "EnemyAI") == "FindShoot") {
        zzPathHolder = scene.aStar(Enemy.tilemapLocation(), sprites.readDataSprite(Enemy, "E-Target").tilemapLocation())
        if (zzPathHolder.length > sprites.readDataNumber(Enemy, "E-Speed") + 3) {
            while (zzPathHolder.length > sprites.readDataNumber(Enemy, "E-Speed")) {
                zzzSpeedLimit = zzPathHolder.pop()
            }
            scene.followPath(Enemy, zzPathHolder)
        } else {
            zzPathHolder = scene.aStar(Enemy.tilemapLocation(), tiles.getTileLocation(randint(2, -2) + Enemy.tilemapLocation().column, randint(2, -2) + Enemy.tilemapLocation().row))
            CreateProj(Enemy, sprites.readDataSprite(Enemy, "E-Target"), assets.image`FireBolt`, 100, 500, sprites.readDataNumber(Enemy, "E-Speed"))
            scene.followPath(Enemy, zzPathHolder)
        }
    } else if (sprites.readDataString(Enemy, "EnemyAI") == "Turret") {
    	
    } else {
    	
    }
}
sprites.onDestroyed(SpriteKind.Projectile, function (sprite) {
    if (sprites.readDataNumber(sprite, "MultuseNUM") == 1) {
        zzArrayHolder = []
        for (let value9 of spriteutils.getSpritesWithin(SpriteKind.Player, 20, sprite)) {
            sprites.changeDataNumberBy(value9, "HP", -3)
        }
        for (let value10 of spriteutils.getSpritesWithin(SpriteKind.Enemy, 20, sprite)) {
            sprites.changeDataNumberBy(value10, "HP", -3)
        }
        Customeffects("Fireball", sprite, true, 1, 1, 200)
    }
})
function CreateSelectionMenu (Owner: Sprite) {
    sprites.setDataBoolean(Something, "CantSwap", true)
    sprites.setDataSprite(Something, "S-Owner", Owner)
    grid.place(Something, Owner.tilemapLocation())
    sprites.setDataSprite(Something, "S-Control", Something)
    zzNumHolder1 = -90
    zzNumHolder2 = 0
    zzArrayHolder = []
    if (sprites.readDataString(Owner, "Mhand") != spriteutils.nullConsts(spriteutils.NullConsts.Undefined)) {
        zzArrayHolder.push(sprites.readDataString(Owner, "Mhand"))
    }
    if (sprites.readDataString(Owner, "Ohand") != spriteutils.nullConsts(spriteutils.NullConsts.Undefined)) {
        zzArrayHolder.push(sprites.readDataString(Owner, "Ohand"))
    }
    if (sprites.readDataString(Owner, "Spell1") != spriteutils.nullConsts(spriteutils.NullConsts.Undefined)) {
        zzArrayHolder.push(sprites.readDataString(Owner, "Spell1"))
    }
    if (sprites.readDataString(Owner, "Spell2") != spriteutils.nullConsts(spriteutils.NullConsts.Undefined)) {
        zzArrayHolder.push(sprites.readDataString(Owner, "Spell2"))
    }
    if (sprites.readDataString(Owner, "Spell3") != spriteutils.nullConsts(spriteutils.NullConsts.Undefined)) {
        zzArrayHolder.push(sprites.readDataString(Owner, "Spell3"))
    }
    for (let index = 0; index < zzArrayHolder.length; index++) {
        Placeholder = sprites.create(assets.image`UndefinedAM`, SpriteKind.Menu)
        Placeholder.setStayInScreen(true)
        sprites.setDataNumber(Placeholder, "MultuseNUM", 1)
        Placeholder.setFlag(SpriteFlag.GhostThroughWalls, true)
        MenuImgs(Placeholder, zzArrayHolder[zzNumHolder2])
        sprites.setDataString(Placeholder, "MenuSelect", zzArrayHolder[zzNumHolder2])
        Placeholder.setPosition(Owner.x + 16 * Math.cos(zzNumHolder1 * (spriteutils.consts(spriteutils.Consts.Pi) / 180)), Owner.y + 16 * Math.sin(zzNumHolder1 * (spriteutils.consts(spriteutils.Consts.Pi) / 180)))
        zzNumHolder1 += 360 / zzArrayHolder.length
        zzNumHolder2 += 1
    }
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (sprites.readDataSprite(sprite, "S-Owner") != otherSprite) {
        sprite.setVelocity(0, 0)
        sprite.setFlag(SpriteFlag.Ghost, true)
        sprites.changeDataNumberBy(otherSprite, "HP", -1 * sprites.readDataNumber(sprite, "DATA-DMG"))
        if (sprites.readDataNumber(otherSprite, "HP") <= 0) {
            Customeffects("BigSteps", otherSprite, true, 1, 1, 500)
            sprites.destroy(otherSprite, effects.starField, 200)
        }
    }
})
let zzNumHolder2 = 0
let zzArrayHolder: string[] = []
let zzzSpeedLimit: tiles.Location = null
let zzPathHolder: tiles.Location[] = []
let list = 0
let zzNumHolder1 = 0
let zzArrayLocationHolder: tiles.Location[] = []
let myEffect: SpreadEffectData = null
let ActiveMember = 0
let Aimer: Sprite = null
let Turnstate = 0
let textSprite: TextSprite = null
let mySprite: Sprite = null
let LocationY = 0
let LocationX = 0
let CurrentParty: Sprite[] = []
let SmartCam: Sprite = null
let Something: Sprite = null
let Placeholder: Sprite = null
namespace SpriteKind {
    export const Stupid = SpriteKind.create()
    export const PlaceHolder = SpriteKind.create()
    export const PC_Projectile = SpriteKind.create()
    export const Menu = SpriteKind.create()
    sprites.setDataSprite(null, "", null)
}
Placeholder = sprites.create(assets.image`Logo`, SpriteKind.PlaceHolder)
pauseUntil(() => controller.A.isPressed())
sprites.destroy(Placeholder)
Placeholder = sprites.create(img`
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ...................111............................................11...........................................11...............................................
    ...................1..1..........................................1..1.........................................1..1..............................................
    ...................111........1111...............................1..1.......1111..............................1..1..............................................
    ...................1..1......1....1..............................1111......1....1.............................1111..............................................
    ...................1..1......1....1..............................1..1......1....1.............................1..1..............................................
    ...................111.......1....1..............................1..1......1..1...............................1..1..............................................
    .............................1....1........................................1..11................................................................................
    ..............................1111..........................................1.111...............................................................................
    ..............................................................................1.................................................................................
    .................................................................................1..............................................................................
    ................................................................................................................................................................
    ..............................111...........................................111..................................111............................................
    ..............................1.............................................1....................................1..............................................
    ..............................1.............................................1....................................1.......1....11....11..........................
    .............................1..111........................................1..111...............................1..111....1111111..1..1.........................
    .................................1.............................................1....................................1....1....11...1..1.........................
    ...............................1111..........................................1111.................................1111..............11..........................
    ...............................1111..........................................1111.................................1111..........................................
    ...............................1..1..........................................1..1.................................1..1..........................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ......................1111.............1111.........................1111.............1111.......................................................................
    .....................1....1...........1....1.......................1....1...........1....1......................................................................
    .....................1....1...........1....1.......................1....1...........1....1......................................................................
    .....................1....1...........1....1.......................1....1...........1....1......................................................................
    .....................1....1...........1....1.......................1....1...........1....1......................................................................
    ......................1111.............1111.........................1111.............1111.......................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    `, SpriteKind.PlaceHolder)
timer.after(500, function () {
    pauseUntil(() => controller.A.isPressed())
    sprites.destroy(Placeholder)
    scene.setBackgroundColor(7)
    scroller.setLayerImage(scroller.BackgroundLayer.Layer0, assets.image`BG`)
    scroller.scrollBackgroundWithCamera(scroller.CameraScrollMode.BothDirections)
    Something = sprites.create(img`
        . . . . . . . . 
        . . . . . . . . 
        . 1 1 1 1 1 1 . 
        1 c f f f f c 1 
        . 1 c f f c 1 . 
        . . 1 c c 1 . . 
        . . . 1 1 . . . 
        . . . . . . . . 
        `, SpriteKind.Stupid)
    Something.z = 10
    sprites.setDataBoolean(Something, "Ghost", true)
    SmartCam = sprites.create(assets.image`N-A`, SpriteKind.Stupid)
    SmartCam.setFlag(SpriteFlag.Ghost, true)
    scene.cameraFollowSprite(SmartCam)
    CurrentParty = []
    LocationX = 1
    LocationY = 1
    CreatePC("Sir.Red", 2)
    tiles.placeOnTile(mySprite, tiles.getTileLocation(8, 8))
    CreatePC("Dr.Purple", 2)
    tiles.placeOnTile(mySprite, tiles.getTileLocation(8, 9))
    CreatePC("Mr.Green", 2)
    tiles.placeOnTile(mySprite, tiles.getTileLocation(8, 10))
    TurnState(0)
    textSprite = textsprite.create("")
    textSprite.setFlag(SpriteFlag.RelativeToCamera, true)
    textSprite.setOutline(1, 15)
    textSprite.setPosition(5, 115)
    CreateWorld(1, 1, 1, 1, 1)
})
game.onUpdate(function () {
    if (Something) {
        if (!(Something == sprites.readDataSprite(Something, "S-Control"))) {
            Something.setPosition(sprites.readDataSprite(Something, "S-Control").x, sprites.readDataSprite(Something, "S-Control").y - 7)
            Something.setImage(assets.image`Moving Char`)
            if (sprites.readDataSprite(Something, "S-Control") != Aimer) {
                if (Turnstate == 0) {
                    textSprite.setText("Hp:" + sprites.readDataNumber(sprites.readDataSprite(Something, "S-Control"), "HP") + "/" + sprites.readDataNumber(sprites.readDataSprite(Something, "S-Control"), "MaxHP"))
                } else {
                    textSprite.setText("Hp:" + sprites.readDataNumber(sprites.readDataSprite(Something, "S-Control"), "HP") + "/" + sprites.readDataNumber(sprites.readDataSprite(Something, "S-Control"), "MaxHP") + " M:" + sprites.readDataNumber(sprites.readDataSprite(Something, "S-Control"), "PC-Movement"))
                }
            }
        } else {
            Something.setImage(assets.image`ChooseingAction`)
        }
        if (characterAnimations.matchesRule(sprites.readDataSprite(Something, "S-Control"), characterAnimations.rule(Predicate.FacingRight)) && sprites.readDataSprite(sprites.readDataSprite(Something, "S-Control"), "H-Hand") != spriteutils.nullConsts(spriteutils.NullConsts.Null)) {
            if (sprites.readDataSprite(sprites.readDataSprite(Something, "S-Control"), "H-Offhand") != spriteutils.nullConsts(spriteutils.NullConsts.Null)) {
                sprites.readDataSprite(sprites.readDataSprite(Something, "S-Control"), "H-Offhand").setPosition(-3 + sprites.readDataSprite(Something, "S-Control").x, 2 + sprites.readDataSprite(Something, "S-Control").y)
            }
            sprites.readDataSprite(sprites.readDataSprite(Something, "S-Control"), "H-Hand").setPosition(4 + sprites.readDataSprite(Something, "S-Control").x, sprites.readDataSprite(Something, "S-Control").y)
        } else if (characterAnimations.matchesRule(sprites.readDataSprite(Something, "S-Control"), characterAnimations.rule(Predicate.FacingLeft)) && sprites.readDataSprite(sprites.readDataSprite(Something, "S-Control"), "H-Hand") != spriteutils.nullConsts(spriteutils.NullConsts.Null)) {
            sprites.readDataSprite(sprites.readDataSprite(Something, "S-Control"), "H-Hand").setPosition(-3 + sprites.readDataSprite(Something, "S-Control").x, sprites.readDataSprite(Something, "S-Control").y)
            if (sprites.readDataSprite(sprites.readDataSprite(Something, "S-Control"), "H-Offhand") != spriteutils.nullConsts(spriteutils.NullConsts.Null)) {
                sprites.readDataSprite(sprites.readDataSprite(Something, "S-Control"), "H-Offhand").setPosition(3 + sprites.readDataSprite(Something, "S-Control").x, 2 + sprites.readDataSprite(Something, "S-Control").y)
            }
        }
    }
})
