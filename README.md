# :ledger: xNotes
This a Chrome Extension for write notes on new tab. use chrome.storage API to save note and available in dark theme. install via [Chrome Store](https://chrome.google.com/webstore/detail/xnotes/kdcjpeakcckhecgojnbjiohjnbfkgmie) 

_Have a question ? hit me up at in.zakiy@gmail.com_

### 🚀 Quick Development

Develop

1.  **Clone repo**

    ```sh
    git clone https://github.com/ahmadzakiy/xblog.git
    yarn
    ```

1.  **Start developing**

    Navigate into your new site’s directory and start it up.

    ```sh
    cd xblog/
    yarn start
    ```

Build and Test Chrome Extension

- un-comment `getStore` and `setStore` function at `app.js`
- `yarn build`
- load built folder from `chrome://extensions/`

---

### Log

v2.0.1

```
- change add new note to "alt/option + enter" instead of "cmd + shift" keyword
```

v2.0.0

```
- refactor code and change folder structure
- change add new note to "cmd + enter" instead of "enter + shift" keyword
- change delete, move, edit button with icons
- window scrollable sort
- add theming provider
- add note's filter
```

v1.3.2

```
- cleaning code
- change add new note from "enter" keyword to "enter + shift" keyword
- add animation
- change copywrite welcoming card
```

v1.2.1

```
- fixing bug move card
- add storybookJS
```

v1.1.0

```
- edit note
- copy note
- welcoming note
```

v1.0.0

```
- add note
- delete note
- move card
```
