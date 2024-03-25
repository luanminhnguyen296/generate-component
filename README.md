# Generate Component⚡

> 💡 The tool helps developers quickly create components according to the folder structure and file format they desire with just one simple command line.

## Get started [💚](https://www.npmjs.com/package/pinia#help-me-keep-working-on-this-project-)

* **Step 1:** Copy the gen_cop folder to the project's root directory
* **Step 2:** Run the chmod command to grant permissions to the generate-component.mjs file
* ```javascript
  chmod +x gen_cop/generate-component.js
  ```
* **Step 3:** Add script command to package.json file

```json
{
   "scripts": {
	"genCop": "node ./gen_cop/generate-component.mjs" 
    },
}
```

* **Step 4:** Run the generate component command

  ```
  * yarn gen-cop [nameComponent] [prarentFolderPath]
  * npm run gen-cop UserItem ../apps/component/admin/Users
  ```

The tool will create a UserItem folder in the apps/component/admin/Users folder. Inside there will be 2 files UserItem.tsx and index.tsUserItem.tsx

```typescript
import React from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  id: string
}

const UserItem: React.FC<Props> = ({ id }) => {
  return (
    <div id={id}>
      myCopY
    </div>
  );
};

export defaultUserItem;

```

```typescript
export {default} from './UserItem'
```


### [ 💚](https://www.npmjs.com/package/pinia#help-me-keep-working-on-this-project-) Finally, enjoy your achievements [💚](https://www.npmjs.com/package/pinia#help-me-keep-working-on-this-project-)
