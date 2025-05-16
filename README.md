
  

# 🚀 Shipment Backend System Documentation

  

Welcome to the documentation for the Shipment Backend System. This guide outlines the project's folder structure, design patterns, and key features, providing a comprehensive overview for developers and stakeholders.

  

----------

  

## 📂 Folder Structure

  

The project is organized into a modular structure to ensure clarity and scalability. Below is the detailed folder hierarchy:

  

```

├── app.controller.spec.ts

├── app.module.ts

├── main.ts

│

├── common/

│ ├── constants/

│ │ └── app-constants.ts

│ ├── exceptions/

│ │ └── base.exception.ts

│ ├── filters/

│ │ └── http-exception.filter.ts

│ └── resources/

│ └── api-response.resource.ts

│

├── database/

│ └── seed.ts

│

└── shipment/

├── shipment.module.ts

├── entities/

│ ├── shipment.entity.ts

│ └── status.entity.ts

├── enums/

│ ├── error-messages.enum.ts

│ ├── shipment-status.enum.ts

│ └── shipment-success-message.enum.ts

├── exceptions/

│ ├── duplicate-tracking-id.exception.ts

│ ├── invalid-shipment-status-transition.exception.ts

│ ├── shipment-not-found.exception.ts

│ ├── shipment-status-already-set.exception.ts

│ └── status-not-found.exception.ts

├── repositories/

│ ├── shipment.repository.interface.ts

│ └── implementations/

│ ├── shipment.repository.impl.ts

│ ├── shipment.repository.proxy.ts

│ └── status.repository.ts

├── services/

│ └── shipment.service.ts

└── web/

├── controllers/

│ └── shipment.controller.ts

├── dto/

│ └── create-shipment.dto.ts

└── resources/

├── shipment-detail.resource.ts

└── shipment.resource.ts

  

```

  

----------

  

## 🧩 Design Patterns

  

The system leverages industry-standard design patterns to ensure maintainability, scalability, and performance.

  

### Singleton Pattern

  

-  **Used In**: Beans and configurations

-  **Purpose**: Ensures a single instance of critical components, reducing resource overhead and maintaining consistency.

  

### 🔄 Proxy Design Pattern

  

-  **Used In**: `shipment.repository.proxy.ts`

-  **Purpose**: Implements a caching layer over `ShipmentRepositoryImpl` using NestJS `CACHE_MANAGER`.

-  **Benefit**: Reduces database queries, improving response times.

  

**Example**:

  

```ts

const  cacheKey = `shipment:id:${id}`;

let  cached = await  this.cacheManager.get<Shipment>(cacheKey);

  

if (!cached) {

const  shipment = await  this.shipmentRepo.findById(id);

await  this.cacheManager.set(cacheKey, shipment, 300);

}

  

```

  

### 📚 Repository Pattern

  

-  **Interface**: `shipment.repository.interface.ts`

-  **Concrete Implementation**: `shipment.repository.impl.ts`

-  **Proxy Decorator**: `shipment.repository.proxy.ts`

-  **Purpose**: Abstracts database access, promoting separation of concerns and enhancing testability.

  

----------

  

## 💡 Key Features

  

The Shipment Backend System includes powerful features to optimize performance, ensure consistency, and improve developer experience.

  

### 1. ✅ Caching Layer

  

-  **Cached Methods**: `findById`, `findByTrackingId`, `findPaginated`

-  **Technology**: Backed by NestJS `CacheManager`

-  **Benefit**: Minimizes database load, boosting performance for frequently accessed data.

  

### 2. 📑 Global Exception Handling

  

-  **File**: `common/filters/http-exception.filter.ts`

-  **Purpose**: Captures all exceptions and returns a standardized error response.

-  **Benefit**: Simplifies debugging and ensures consistent API error responses.

  

**Example**:

  

```json

{

"errorResponse": {

"status": 400,

"message": "Invalid status transition"

}

}

  

```

  

### 3. 📦 Custom Exceptions with BaseException

  

-  **Base Class**: `base.exception.ts`

-  **Usage**: All domain-specific exceptions extend this class.

-  **Message Source**: Driven by `error-messages.enum.ts` for consistency.

  

**Example**:

  

```ts

throw  new  InvalidShipmentStatusTransitionException();

  

```

  

### 4. 📬 Standardized API Response

  

-  **File**: `common/resources/api-response.resource.ts`

-  **Purpose**: Ensures all success responses follow a uniform structure.

-  **Benefit**: Enhances API predictability and client integration.

  

**Example**:

  

```ts

ApiResponse.success(data, 'Fetched successfully');

  

```

  

**Output**:

  

```json

{

"statusCode": 200,

"message": "Fetched successfully",

"data": { ... }

}

  

```

  

### 5. 🧮 Pagination Constants

  

-  **File**: `app-constants.ts`

-  **Purpose**: Defines reusable pagination defaults across repository and controller layers.

-  **Constants**:

```ts

DEFAULT_PAGE = 1;

DEFAULT_LIMIT = 10;

MAX_LIMIT = 100;

```
