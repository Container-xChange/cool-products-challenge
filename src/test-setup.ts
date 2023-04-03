import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

setupZoneTestEnv();

// polyfills
import 'fake-indexeddb/auto';
