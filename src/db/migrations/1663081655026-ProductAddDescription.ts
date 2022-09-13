import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductAddDescription1663081655026 implements MigrationInterface {
  name = 'ProductAddDescription1663081655026';
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async up(queryRunner: QueryRunner): Promise<void> {}

  public async down(queryRunner: QueryRunner): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  }
}
