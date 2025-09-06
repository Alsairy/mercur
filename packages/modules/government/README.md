# Government Module

This module provides government entity and official management for the Madares Market platform.

## Features

- Government entity management (MOE, ETEC, Municipality, etc.)
- Government official authentication and authorization
- Nafath SSO integration support
- Authority scope and permission management

## Models

### GovernmentEntity
- Represents government organizations (MOE, ETEC, etc.)
- Supports bilingual names (Arabic/English)
- Configurable authority levels (National, Regional, Local)
- Integration configuration for external systems

### GovernmentOfficial
- Represents individual government officials
- Nafath ID integration for SSO authentication
- Department and position tracking
- Authority scope configuration

## Usage

```typescript
import { GOVERNMENT_MODULE } from '@mercurjs/government'

// Register the module in your Medusa configuration
export default {
  modules: {
    [GOVERNMENT_MODULE]: {
      resolve: '@mercurjs/government'
    }
  }
}
```
