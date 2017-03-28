## RADAGAST - API Documentation


### Twitter

**/api/v1/twitter/search**

Search tweets about a topic, optionally selecting a count and a language.

Params:
- q: Search string (Mandatory)
- lang: Language (Optional, default: en)
- count: number of tweets (Optional, default: 1)

  Examples:
 /api/v1/twitter/search/?q=pizza
 /api/v1/twitter/search/?q=tour&lang=fr
 /api/v1/twitter/search/?q=cork&count=10



**/api/v1/twitter/remove**
Remove saved results from previous searches for a topic.
Params:
- q: Search string (Mandatory)

Examples:
/api/v1/twitter/remove/?q=broccoli



**/api/v1/twitter/all**
Shows all saved results from previous searches.
No params. required


### Favourites
**/api/v1/favourites/add**

Add a search topic to an user's favourite list.

Params:

user: user name (Mandatory)
text: search topic (Mandatory)
Examples:

/api/v1/favourites/add/?user=isaac&text=coding

/api/v1/favourites/remove

Remove a search topic to an user's favourite list.

Params:

user: user name (Mandatory)
text: search topic (Mandatory)
Examples:

/api/v1/favourites/remove/?user=isaac&text=sports

/api/v1/favourites/get

Show an user's favourite list.

Params:

user: user name (Mandatory)
Examples:

/api/v1/favourites/get/?user=manuel
