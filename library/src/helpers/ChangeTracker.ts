import { Parser } from './parser';
import { ParserReturn } from '../types';

interface Change {
  path: string[];
  type: 'add' | 'remove' | 'modify';
  elementId: string;
}

export class ChangeTracker {
  private static async parseSchema(schema: string): Promise<ParserReturn | null> {
    try {
      return await Parser.parse(schema);
    } catch (e) {
      return null;
    }
  }

  static async detectChanges(oldSchema: string, newSchema: string): Promise<Change[]> {
    const oldParsed = await this.parseSchema(oldSchema);
    const newParsed = await this.parseSchema(newSchema);
    
    if (!oldParsed?.asyncapi || !newParsed?.asyncapi) return [];

    const oldDoc = oldParsed.asyncapi;
    const newDoc = newParsed.asyncapi;
    const changes: Change[] = [];
    
    // Compare info section
    if (JSON.stringify(oldDoc.info()) !== JSON.stringify(newDoc.info())) {
      changes.push({
        path: ['info'],
        type: 'modify',
        elementId: 'introduction'
      });
    }

    // Compare servers
    const oldServers = oldDoc.servers();
    const newServers = newDoc.servers();
    if (JSON.stringify(oldServers) !== JSON.stringify(newServers)) {
      changes.push({
        path: ['servers'],
        type: 'modify',
        elementId: 'servers'
      });
    }

    // Compare channels
    const oldChannels = oldDoc.channels();
    const newChannels = newDoc.channels();
    if (JSON.stringify(oldChannels) !== JSON.stringify(newChannels)) {
      changes.push({
        path: ['channels'],
        type: 'modify',
        elementId: 'operations'
      });
    }

    // Compare schemas
    const oldSchemas = oldDoc.components()?.schemas()?.all() || [];
    const newSchemas = newDoc.components()?.schemas()?.all() || [];
    if (JSON.stringify(oldSchemas) !== JSON.stringify(newSchemas)) {
      changes.push({
        path: ['components', 'schemas'],
        type: 'modify',
        elementId: 'schemas'
      });
    }

    return changes;
  }
}