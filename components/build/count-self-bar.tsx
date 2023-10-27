import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const Counter = ({total, done}:{total:number, done:number}) => {
    return ( 
        <>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{total}</div>
            <p className="text-xs text-muted-foreground">
              {/* +20.1% from last month */}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Finished tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{done}</div>
            <p className='text-xs text-muted-foreground'>
              {/* +20.1% from last month */}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unfinished tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{total - done}</div>
            <p className='text-xs text-muted-foreground'>
              {/* +20.1% from last month */}
            </p>
          </CardContent>
        </Card>
      </>
     );
}
 
export default Counter;