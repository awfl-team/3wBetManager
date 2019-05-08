export default class Item {
  static TYPE_LOOT_BOX: string = 'LOOT_BOX';
  static TYPE_KEY: string = 'KEY';
  static TYPE_BOMB: string = 'BOMB';
  static TYPE_MYSTERY: string = 'MYSTERY';
  static TYPE_LIFE: string = 'LIFE';
  static TYPE_MULTIPLY_BY_TWO: string = 'MULTIPLY_BY_TWO';
  static TYPE_MULTIPLY_BY_FIVE: string = 'MULTIPLY_BY_FIVE';
  static TYPE_MULTIPLY_BY_TEN: string = 'MULTIPLY_BY_TEN';
  static RARITY_LEGENDARY: string = 'Legendary';
  static RARITY_EPIC: string = 'Epic';
  static RARITY_RARE: string = 'Rare';
  static RARITY_COMMON:string = 'Common';
  static MULTIPLIER_BY_10: number = 10;
  static MULTIPLIER_BY_5: number = 5;
  static MULTIPLIER_BY_2: number = 2;

  Id!: string;
  Type!: string;
  Description!: string;
  Cost!: string;
  Rarity!: string;

  constructor(data: any) {
    if (data.Id) this.Id = data.Id;
    if (data.Type) this.Type = data.Type;
    if (data.Description) this.Description = data.Description;
    if (data.Cost) this.Cost = data.Cost;
    if (data.Rarity) this.Rarity = data.Rarity;
  }
}
