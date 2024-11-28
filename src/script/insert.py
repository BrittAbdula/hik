import sqlite3
import os

# 支持的图片和视频格式
SUPPORTED_FORMATS = ('.jpg', '.jpeg', '.png', '.gif', '.bmp', '.mp4', '.avi', '.mov', '.wmv')
# 需要过滤的系统目录
FILTERED_PATHS = ('@eaDir', '#recycle', '#snapshot', '.DS_Store')

def init_database():
    conn = sqlite3.connect('/Users/tm/hik/hik.db')
    cursor = conn.cursor()
    
    # 创建表，包含12个路径字段和1个文件名字段
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS file_list (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        path1 TEXT,
        path2 TEXT,
        path3 TEXT,
        path4 TEXT,
        path5 TEXT,
        path6 TEXT,
        path7 TEXT,
        path8 TEXT,
        path9 TEXT,
        path10 TEXT,
        path11 TEXT,
        path12 TEXT,
        filename TEXT
    )
    ''')
    
    return conn, cursor

def process_file_path(file_path, base_path):
    # 检查是否包含需要过滤的路径
    if any(filtered in file_path for filtered in FILTERED_PATHS):
        return None, None, 0
    
    # 移除基础路径
    relative_path = file_path.replace(base_path, '').lstrip('/')
    
    # 分割路径
    parts = relative_path.split('/')
    
    # 获取文件名（最后一个元素）
    filename = parts[-1]
    
    # 获取目录部分（除去文件名）
    directories = parts[:-1]
    
    # 填充或截断到12个路径段
    path_segments = directories + [''] * (12 - len(directories))
    path_segments = path_segments[:12]
    
    return path_segments, filename, len(directories)

def main():
    # 连接数据库
    conn, cursor = init_database()
    
    # 基础路径
    base_path = '/volume1/销售工具/图片/'
    
    # 统计计数器
    total_count = 0
    success_count = 0
    fail_count = 0
    unsupported_count = 0
    max_depth = 0
    
    try:
        # 读取文件列表
        with open('/Users/tm/hik/file_list.txt', 'r', encoding='utf-8') as f:
            for line in f:
                total_count += 1
                file_path = line.strip()
                
                # 检查文件扩展名和过滤路径
                if not file_path.lower().endswith(SUPPORTED_FORMATS):
                    unsupported_count += 1
                    continue
                
                try:
                    # 处理路径
                    path_segments, filename, depth = process_file_path(file_path, base_path)
                    
                    # 如果是被过滤的路径，跳过
                    if path_segments is None:
                        unsupported_count += 1
                        continue
                    
                    # 更新最大层级数
                    max_depth = max(max_depth, depth)
                    
                    # 准备插入数据
                    insert_data = tuple(path_segments + [filename])
                    
                    # 插入数据库
                    cursor.execute('''
                    INSERT INTO file_list (
                        path1, path2, path3, path4, path5, path6,
                        path7, path8, path9, path10, path11, path12,
                        filename
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    ''', insert_data)
                    
                    success_count += 1
                    
                except Exception as e:
                    print(f"处理文件失败: {file_path}")
                    print(f"错误信息: {e}")
                    fail_count += 1
        
        # 提交事务
        conn.commit()
        
        # 打印统计信息
        print("\n=== 处理统计 ===")
        print(f"总文件数: {total_count}")
        print(f"成功处理: {success_count}")
        print(f"处理失败: {fail_count}")
        print(f"不支持的格式: {unsupported_count}")
        print(f"最大目录层级: {max_depth}")
        print("===============")
        
        # 验证数据
        cursor.execute("SELECT COUNT(*) FROM file_list")
        db_count = cursor.fetchone()[0]
        print(f"\n数据库中的记录数: {db_count}")
        
        # 打印一个最深层级的示例
        if db_count > 0:
            query = "SELECT * FROM file_list WHERE "
            query += " AND ".join([f"path{i+1} != ''" for i in range(max_depth)])
            query += " LIMIT 1"
            cursor.execute(query)
            example = cursor.fetchone()
            if example:
                print("\n最深层级路径示例:")
                path_parts = [p for p in example[1:-1] if p]  # 去除空值
                print("/".join(path_parts + [example[-1]]))
        
    except Exception as e:
        print(f"发生严重错误: {e}")
        conn.rollback()
    
    finally:
        conn.close()


if __name__ == "__main__":
    main()