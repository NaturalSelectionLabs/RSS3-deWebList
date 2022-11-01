# Decentralized Website List

![GitHub license](https://img.shields.io/github/license/NaturalSelectionLabs/decentralized-website-list?style=flat-square)
![GitHub all releases](https://img.shields.io/github/downloads/NaturalSelectionLabs/decentralized-website-list/total?style=flat-square)
![GitHub closed pull requests](https://img.shields.io/github/issues-pr-closed/NaturalSelectionLabs/decentralized-website-list?style=flat-square)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/NaturalSelectionLabs/decentralized-website-list?style=flat-square)

This project hopes to help everyone find some interesting decentralized websites.

## Contributing

Edit the [websites.json](https://github.com/NaturalSelectionLabs/decentralized-website-list/edit/main/lists/websites.json) file and create a [pull request](https://github.com/NaturalSelectionLabs/decentralized-website-list/pulls).

## Specification

The decentralized site list is a JSON file, All list files must conform to the [JSON specification](https://www.json.org/json-en.html).

```typescript
enum WebsiteType {
    ENS = "ENS",
    IPNS = "IPNS",
    IPFS = "IPFS",
}

type WebsiteFeed = {
    type: string;
    file: string;
}

type Website = {
    name: string;
    description?: string;
    type: WebsiteType;
    value: string; // ENS domain or IPFS CID
    tags: [string],
    feeds: [WebsiteFeed];
}
```

Here's a simple example:

```json
 {
  "name": "Vitalik Buterin's website",
  "type": "ens",
  "value": "vitalik.eth",
  "tags": [
    "blog"
  ],
  "feeds": [
    {
      "type": "application/rss+xml",
      "file": "feed.xml"
    }
  ]
}
```

## License

License under the [Creative Commons Zero v1.0 Universal](LICENSE).
