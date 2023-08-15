import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('UnitAmount', (type) => UnitAmount)
export class UnitAmountScalar implements CustomScalar<string, UnitAmount> {
  description = 'Unit amount custom scalar type';

  parseValue(value: string): UnitAmount {
    return UnitAmount[value];
  }

  serialize(value: UnitAmount): string {
    return value;
  }

  parseLiteral(ast: ValueNode): UnitAmount {
    if (ast.kind === Kind.STRING) {
      return UnitAmount[ast.value];
    }
    return null;
  }
}

enum UnitAmount {
  secs = 'secs',
  hrs = 'hrs',
  min = 'min',
}
