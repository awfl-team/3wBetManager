export default class Item {
  public static TYPE_LOOT_BOX: string = 'LOOT_BOX';
  public static TYPE_KEY: string = 'KEY';
  public static TYPE_BOMB: string = 'BOMB';
  public static TYPE_MYSTERY: string = 'MYSTERY';
  public static TYPE_LIFE: string = 'LIFE';
  public static TYPE_MULTIPLY_BY_TWO: string = 'MULTIPLY_BY_TWO';
  public static TYPE_MULTIPLY_BY_FIVE: string = 'MULTIPLY_BY_FIVE';
  public static TYPE_MULTIPLY_BY_TEN: string = 'MULTIPLY_BY_TEN';
  public static RARITY_LEGENDARY: string = 'Legendary';
  public static RARITY_EPIC: string = 'Epic';
  public static RARITY_RARE: string = 'Rare';
  public static RARITY_COMMON: string = 'Common';
  public static MULTIPLIER_BY_10: number = 10;
  public static MULTIPLIER_BY_5: number = 5;
  public static MULTIPLIER_BY_2: number = 2;

  public Id!: string;
  public Type!: string;
  public Description!: string;
  public Cost!: string;
  public Rarity!: string;

  constructor(data: any) {
    if (data.Id) { this.Id = data.Id; }
    if (data.Type) { this.Type = data.Type; }
    if (data.Description) { this.Description = data.Description; }
    if (data.Cost) { this.Cost = data.Cost; }
    if (data.Rarity) { this.Rarity = data.Rarity; }
  }
}
