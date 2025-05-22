viewport: 'w-50 items-end',
content: 'w-auto items-end',
childList: 'w-auto flex flex-col',
childLinkWrapper: 'flex flex-col items-end',

```
import { useRuntimeConfig } from "#app";
```


```
  const runtimeConfig = useRuntimeConfig();
  const baseURL = runtimeConfig.app.baseURL;
```

```
    src: `${baseURL}/assets/rive/focusbtn.riv`,
```