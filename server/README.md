# Automated Crowd Monitoring System REST API
## HOW TO USE
Send REST API requests to
```
sysdev-acms-api.herokuapp.com/{URI}
```

## URIs
<table>
<tr>
<th>
REQUEST
</th>
<th>
ROUTE
</th>
<th>
BODY
</th>
<th>
DESCRIPTION
</th>
</tr>

<tr>
<td>
GET
</td>
<td>
<code>
/api/users/:id
</code>
</td>
<td>
<pre lang='json'>
{}
</pre>
</td>
<td>
Returns row as an object if it matches an id from the sheets
</td>
</tr>

<tr>
<td>
PUT
</td>
<td>
<code>
/api/users/:id
</code>
</td>
<td>
<pre lang='json'>
{"entered": boolean}
</pre>
</td>
<td>
Updates entered status if it matches an id from the sheets
</td>
</tr>

</table>