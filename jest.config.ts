export default {
    displayName: 'xchange-devskiller',
    preset: './jest.preset.js',
    setupFilesAfterEnv: ['./src/test-setup.ts'],
    testEnvironment: 'jsdom',
    coverageDirectory: './coverage',
    globals: {
        'ts-jest': {
            tsconfig: './tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$'
        }
    },
    transform: {
        '^.+\\.(ts|mjs|js|html)$': 'jest-preset-angular',
    },
    snapshotSerializers: [
        'jest-preset-angular/build/serializers/no-ng-attributes',
        'jest-preset-angular/build/serializers/ng-snapshot',
        'jest-preset-angular/build/serializers/html-comment'
    ],
    coverageReporters: ['clover', 'json', 'lcov', 'text', 'text-summary'],
    collectCoverage: true
};
