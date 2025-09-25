import { AsyncAPIDocumentInterface } from '@asyncapi/parser';
import { Parser } from './Parser';

interface Change {
  path: string[];
  type: 'add' | 'remove' | 'modify';
  elementId: string;
}

export class ChangeTracker {
  private static getElementId(path: string[]): string {
    return path.join('-');
  }

  private static async parseSchema(schema: string) {
    try {
      const parsed = await Parser.parse(schema);
      return parsed;
    } catch (e) {
      return null;
    }
  }

  static async detectChanges(oldSchema: string, newSchema: string): Promise<Change[]> {
    const oldDoc = await this.parseSchema(oldSchema);
    const newDoc = await this.parseSchema(newSchema);
    
    if (!oldDoc || !newDoc) return [];

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