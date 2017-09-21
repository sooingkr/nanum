Install java 1.6

```bash
brew update
brew cask install java6
open /usr/local/Caskroom/java6/1.6.0_65/JavaForOSX.pkg
 ```
Mysql
```bash
brew install mysql
mysql.server start
mysql
```

```sql
CREATE SCHEMA nanum DEFAULT CHARACTER SET utf8; 
```
 
Gradle 2.14.1
 ```bash
 gradle clean build -x test
 gradle bootRun
 ```