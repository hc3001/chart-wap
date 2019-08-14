<template>
    <div class="table-brief">
        <table>
            <tr v-for="rows in tableData.tables">
                <td v-for="cell in rows">{{cell}}</td>
            </tr>
        </table>
    </div>
</template>
<script type="text/ecmascript-6">
    
    export default {
        props: {
            tableData: {
                type: Object,
                default: ()=>{
                    return {}
                }
            }
        }
    }
</script>
<style lang="scss">
    .table-brief {
        width: 100%;
        table {
            width: 100%;
            font-size: 0.28rem;
            font-weight: 600;
            border-collapse:collapse;
            tr {
                td:first-child {
                    font-size: 0.26rem;
                    font-weight: 500;
                    color: rgba(102, 102, 102, 1);
                    width: 0.54rem;
                    padding: 0 0.2rem;
                }
                td:last-child {
                    padding: 0 0.1rem;
                }
                td {
                    text-align: center;
                }
            }
            tr:first-child {
                font-size: 0.26rem;
                color: rgba(102, 102, 102, 1);
                font-weight: 500;
                td {
                    padding: 0.1rem 0;
                }
            }
            tr:not(:first-child) {
                height: 0.7rem;
            }
            tr:nth-child(even) {
                background-color: rgba(242, 242, 244, 1);
            }

        }
    }
</style>