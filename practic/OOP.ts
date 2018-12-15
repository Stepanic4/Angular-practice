// // Primitives
// const numericVariable: number = 100500;
// const stringVariable: string = 'Some random string value';
// const booleanVariable: boolean = true;
//
// // Arrays, equal expressions
// const stringArrSimple: string[] = [ 'One', 'Two', 'Three' ];
// const stringArrGeneric: Array<string> = [ 'One', 'Two', 'Three' ];
//
// // Typed objects
// // All keys of this object should be numeric, value is a string
// const typedObj1: { [ key: number ]: string } = { 1: 'a', 2: 'b', 3: 'c' };
// // All keys of this object should be string, value is a number
// const typedObj2: { [ key: string ]: number } = { a: 1, b: 2, c: 3 };
// // Object should contain only defined properties with defined types for them (that's very close to interface)
// const typedObj: { a: string, b: number, c: boolean } = { a: 'String value', b: 1, c: true };
//
// // Maps
// // Values will be set via class constructor
// const map1: Map<string, number> = new Map<string, number>(
//   new Array<[ string, number ]>(// Generic syntax means that array should contain only 2 items, the first item is a string, the second is a value
//     [ 'a', 1 ], // First element is a key, the second one is a value
//     [ 'b', 2 ]
//   )
// );
// // Values will be set via class method
// const map2: Map<string, number> = new Map<string, number>();
// map2.set('a', 1);
// map2.set('b', 2);
// // Retreiving defined data
// const map2propertyA: number | undefined = map2.get('a'); // If there is no 'a' prop we'll get undefined
// // How to check the value by its type
// if (Number.isInteger(map2propertyA)) {}
// // How to check that some value exists
// if (map2.has('a')) {}
// // How to clear all map values
// map2.clear();
// // Loop
// map2.forEach((value: number, key: string, mapReference: Map<string, number>): void => {
//   // Value and key of map item, third arg is the whole map. Don't try to change the map by changing this map
// });
// // How to get map properties via while loop
// const keysIterator: IterableIterator<string> = map2.keys();
// let mapKeysCurrentValue: IteratorResult<string> = keysIterator.next();
// while (!mapKeysCurrentValue.done) {
//   console.log(mapKeysCurrentValue.value);
//   mapKeysCurrentValue = keysIterator.next();
// }
// const valuesIterator: IterableIterator<number> = map2.values();
// let mapValuesCurrentValue: IteratorResult<number> = valuesIterator.next();
// while (!mapValuesCurrentValue.done) {
//   console.log(mapValuesCurrentValue.value);
//   mapValuesCurrentValue = valuesIterator.next();
// }
//
// // Enums
// enum UserRoleEnum {
//   Admin = 'admin',
//   User = 'user',
//   Guest = 'guest'
// }
//
// // String types
// type PermissionType = 'view' | 'edit' | 'delete';
// const userPermissions: PermissionType[] = [ 'view', 'edit', 'delete' ]; // Can't write any other string since arr type is PermissionType
//
// // Interface
// interface UserEditableFieldsInterface {
//   username: string;
//   email: string;
//   role?: UserRoleEnum; // Optional property, we don't have to implement it
//   permissions: PermissionType[];
// }
// interface UserInterface extends UserEditableFieldsInterface {
//   id: string;
// }
// // Can use it like this but it's better to use classes since I can't check variable type
// const userWithInterfaceType: UserInterface = { id: 'someID', username: 'Some Name', email: 'Some Email', permissions: [] };
//
// // Interface to make object typed
// interface KeyValueInterface<T> {
//   [ prop: string ]: T;
// }
//
// // Classes
// class UserEditableFieldsModel implements UserEditableFieldsInterface {// Class that implemented some interface(s), should have described properties
//   public username: string;
//   public email: string;
//   public role: UserRoleEnum;
//   public permissions: PermissionType[];
//   constructor(params: UserEditableFieldsInterface = {} as UserEditableFieldsInterface) {
//     this.username = params.username;
//     this.email = params.email;
//     this.role = params.role || UserRoleEnum.Guest;
//     this.permissions = params.permissions;
//   }
// }
// class UserModel extends UserEditableFieldsModel implements UserInterface {
//   public readonly id: string; // Readonly restricts property overwriting
//   constructor(params: UserInterface = {} as UserInterface) {
//     super(params);
//     this.id = params.id;
//   }
// }
//
// // Use case: Server returns user list, each user has different structure / prop names
// // Creating fake JSON
// const fakeJSON: string = JSON.stringify({
//   id1: { userID: 'id1', name: 'Admin User', email: 'admin-email@gmail.com', role: 'ADMIN', perms: [ 'view', 'edit', 'delete' ] },
//   id2: { userID: 'id2', name: 'Simple User', email: 'user@gmail.com', role: 'USER', perms: [ 'view' ] },
//   id3: { userID: 'id3', name: 'Guest User', email: 'guest@gmail.com', role: 'GUEST', perms: [] }
// });
//
// /**
//  * Async wrapper above the JSON.parse
//  * @param json { String }
//  * @returns { Promise<KeyValueInterface<any>> }
//  * @async
//  */
// async function parseJSON(json: string): Promise<KeyValueInterface<any>> {
//   return new Promise((resolve: Function, reject: Function): void => {
//     try {
//       const parsed: KeyValueInterface<any> = JSON.parse(json);
//       resolve(parsed);
//     } catch (e) {
//       reject(new Error('Incorrect JSON'));
//     }
//   });
// }
//
// /**
//  * Function accepts untyped user data in "server" format and returns untyped data in our format
//  * @param data { KeyValueInterface<Any> }
//  * @returns { KeyValueInterface<Any> }
//  */
// function transformData(data: KeyValueInterface<any> = {}): KeyValueInterface<any> {
//   // Creating the new obj instead of changing given to prevent editing by reference
//   return {
//     id: Object.keys(data)[0],
//     username: data.name,
//     email: data.email,
//     role: data.role,
//     permissions: data.perms || []
//   };
// }
//
// /**
//  * Function creates and returns user model from given untyped data
//  * @param rawData { KeyValueInterface<Any> }
//  * @returns { UserModel }
//  */
// function createUserModel(rawData: KeyValueInterface<any> = {}): UserModel {
//   // Don't do it like params = { ... rawData } or via the loop or you'll write properties that don't exists on UserInterface
//   const params: UserInterface = {} as UserInterface;
//
//   params.id = rawData.id;
//   params.username = rawData.username;
//   params.email = rawData.email;
//   params.permissions = [];
//
//   switch (rawData.role.toLowerCase()) {
//     case 'admin':
//       params.role = UserRoleEnum.Admin;
//       break;
//     case 'user':
//       params.role = UserRoleEnum.User;
//       break;
//     case 'guest':
//     default:
//       params.role = UserRoleEnum.Guest;
//   }
//
//   for (const maybePermission of rawData.permissions) {
//     switch (maybePermission.toLowerCase()) {
//       case 'view':
//         params.permissions.push('view');
//         break;
//       case 'edit':
//         params.permissions.push('edit');
//         break;
//       case 'delete':
//         params.permissions.push('delete');
//         break;
//     }
//   }
//
//   return new UserModel(params);
// }
//
// /**
//  * Function executes all functions to create user model from raw JSON
//  * @param json { String }
//  * @returns { Promise<UserModel[]> }
//  * @async
//  */
// async function parseUserList(json: string): Promise<UserModel[]> {
//   return new Promise<UserModel[]>((resolve: Function, reject: Function): void => {
//     parseJSON(json)
//       .then((rawData: KeyValueInterface<any> = []): void => {
//         resolve(
//           Object.keys(rawData)
//             .map(
//               (id: string): UserModel => createUserModel(transformData({ id, ... rawData[id] }))
//             )
//         );
//       })
//       .catch((error: Error): void => reject(error));
//   });
// }
//
// // Calling the function and getting the results
// parseUserList(fakeJSON)
//   .then((res: UserModel[]): void => console.log(res))
//   .catch((e: Error): void => console.error(e));
//
//
// // Abstract class
// abstract class TestAbstractClass {
//   public abstract testMethod(x: number): string;
// }
// // Important! You can't create new TestAbstractClass instance since it abstract and has non-implemented method(s)
//
// class TestChildClass extends TestAbstractClass {
//   public testMethod(x: number): string {
//     return x.toString();
//   }
// }
