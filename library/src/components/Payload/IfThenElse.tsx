import React, { useState, useEffect, useContext } from 'react';
import { SchemaInterface } from '@asyncapi/parser';

interface props {
  ifSchema: SchemaInterface | undefined;
  thenSchema: SchemaInterface | undefined;
  elseSchema: SchemaInterface | undefined;
}

export const IfThenElse = ({ ifSchema, thenSchema, elseSchema }: props) => {
  return <div>TODO</div>;
};
