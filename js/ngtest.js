/*
 * Copyright 2015 University of Southern California
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

angular.module('testApp', ['ERMrest'])

.controller('testController', ['ermrestClientFactory', function(ermrestClientFactory) {
    client = ermrestClientFactory.getClient('https://dev.misd.isi.edu/ermrest', null);
    console.log('Client Acquired');
    console.log(client);
    catalog = client.getCatalog(1);
    catalog.introspect().then(function(schemas) {
        console.log(schemas);
        var table = schemas['legacy'].getTable('dataset');
        console.log(table);
        table.getRows().then(function(rows) {
            console.log(rows);
            var relatedTable = rows[0].getRelatedTable('legacy', 'dataset_data_type');
            console.log(relatedTable);
            var filteredTable = table.getFilteredTable(["id::gt::200", "id::lt::300"]);
            console.log(filteredTable);
            filteredTable.getRows().then(function(rows) {
                console.log(rows);
            });
        });
    });
}]);